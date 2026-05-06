// Sanity imports disabled - uncomment to enable Sanity integration
// import { client } from '@/sanity/lib/client'
// import { urlFor } from '@/sanity/lib/image'

/**
 * Helper function to get image URL from Sanity image source
 * Sanity integration disabled - returns string URLs directly
 */
function getImageUrl(source) {
  if (!source) return null
  if (source.asset?.url) return source.asset.url // Already dereferenced
  // if (source.asset) return urlFor(source).url() // Disabled - Sanity not available
  if (typeof source === 'string') return source // Direct URL string
  return null
}

/**
 * Convert portable text blocks to HTML string
 * Supports: h1, h2, h3, h4, p, ul, ol, li, strong, em, u (underline), a (links) tags
 */
function portableTextToHtml(blocks) {
  if (!blocks || !Array.isArray(blocks)) return ''
  
  const result = []
  let currentList = null
  let listItems = []
  
  blocks.forEach(block => {
    // Get markDefs from the block (contains link definitions)
    // markDefs are stored at the block level in Sanity's portable text
    const markDefs = block.markDefs || []
    
    // Debug: log if we have markDefs but no links are being created
    if (markDefs.length > 0 && process.env.NODE_ENV === 'development') {
      console.log('🔗 Block markDefs:', JSON.stringify(markDefs, null, 2))
    }
    // Handle images
    if (block._type === 'image') {
      // Close any open list before adding image
      if (currentList) {
        result.push(`<${currentList.tag}>${listItems.join('')}</${currentList.tag}>`)
        currentList = null
        listItems = []
      }
      const url = block.asset?.url || ''
      const alt = block.alt || ''
      if (url) {
        result.push(`<img src="${url}" alt="${alt}" />`)
      }
      return
    }
    
    // Handle tables
    if (block._type === 'table') {
      // Close any open list before adding table
      if (currentList) {
        result.push(`<${currentList.tag}>${listItems.join('')}</${currentList.tag}>`)
        currentList = null
        listItems = []
      }
      
      if (!block.rows || !Array.isArray(block.rows) || block.rows.length === 0) {
        return
      }
      
      // Check if first row should be header
      const firstRow = block.rows[0]
      const hasHeaderRow = firstRow?.cells?.some(cell => cell.isHeader) || false
      
      let tableHtml = '<div style="overflow-x: auto; margin: 1rem 0;"><table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">'
      
      // Add header row if first row has header cells
      if (hasHeaderRow && firstRow.cells) {
        tableHtml += '<thead><tr>'
        firstRow.cells.forEach((cell) => {
          const cellContent = cell.content || ''
          const cellStyle = 'border: 1px solid #ddd; padding: 12px; text-align: left; background-color: #f2f2f2; font-weight: bold;'
          tableHtml += `<th style="${cellStyle}">${cellContent}</th>`
        })
        tableHtml += '</tr></thead>'
      }
      
      // Add body rows
      tableHtml += '<tbody>'
      const startIndex = hasHeaderRow ? 1 : 0
      
      for (let i = startIndex; i < block.rows.length; i++) {
        const row = block.rows[i]
        if (!row.cells || !Array.isArray(row.cells)) continue
        
        tableHtml += '<tr>'
        row.cells.forEach((cell) => {
          const cellTag = cell.isHeader ? 'th' : 'td'
          const cellContent = cell.content || ''
          const cellStyle = 'border: 1px solid #ddd; padding: 12px; text-align: left;'
          const headerStyle = cellStyle + ' background-color: #f2f2f2; font-weight: bold;'
          
          tableHtml += `<${cellTag} style="${cell.isHeader ? headerStyle : cellStyle}">${cellContent}</${cellTag}>`
        })
        tableHtml += '</tr>'
      }
      
      tableHtml += '</tbody></table></div>'
      result.push(tableHtml)
      return
    }
    
    // Handle text blocks
    if (block._type !== 'block') return
    
    const text = block.children?.map(child => {
      if (child._type === 'span') {
        let text = child.text || ''
        
        // Handle marks (bold, italic, underline, links)
        if (child.marks && child.marks.length > 0) {
          // Separate decorators (strong, em, underline) from annotations (links)
          let linkMark = null
          const decorators = []
          
          child.marks.forEach(mark => {
            // In Sanity portable text, marks are strings:
            // - Decorators: 'strong', 'em', 'underline' (direct strings)
            // - Annotations: keys (strings) that reference markDefs array
            
            const markKey = typeof mark === 'string' ? mark : (mark?._key || mark?._type || String(mark))
            
            // Check if this mark key references a link in markDefs
            // markDefs contains objects with _key, _type, and href properties
            const linkDef = markDefs.find(def => def._key === markKey && def._type === 'link')
            
            if (linkDef && linkDef.href) {
              linkMark = linkDef
            } else if (['strong', 'em', 'underline'].includes(markKey)) {
              // It's a decorator
              decorators.push(markKey)
            } else if (markKey && !linkDef) {
              // Unknown mark, but might be a decorator we don't recognize
              // Only add if it's not a potential link key
              decorators.push(markKey)
            }
          })
          
          // Apply decorators first (strong, em, underline)
          decorators.forEach(decorator => {
            if (decorator === 'strong') {
              text = `<strong>${text}</strong>`
            } else if (decorator === 'em') {
              text = `<em>${text}</em>`
            } else if (decorator === 'underline') {
              text = `<u>${text}</u>`
            }
          })
          
          // Apply link last (so it wraps everything)
          if (linkMark && linkMark.href) {
            text = `<a href="${linkMark.href}" target="_blank" rel="noopener noreferrer">${text}</a>`
          }
        }
        
        return text
      }
      return ''
    }).join('') || ''
    
    if (!text) return
    
    // Handle lists
    if (block.listItem) {
      const listTag = block.listItem === 'bullet' ? 'ul' : 'ol'
      
      // If we're starting a new list or changing list type, close the previous list
      if (currentList && currentList.tag !== listTag) {
        result.push(`<${currentList.tag}>${listItems.join('')}</${currentList.tag}>`)
        listItems = []
      }
      
      currentList = { tag: listTag }
      listItems.push(`<li>${text}</li>`)
      return
    }
    
    // Close any open list before adding non-list content
    if (currentList) {
      result.push(`<${currentList.tag}>${listItems.join('')}</${currentList.tag}>`)
      currentList = null
      listItems = []
    }
    
    // Handle block styles
    const style = block.style || 'normal'
    
    switch (style) {
      case 'h1':
        result.push(`<h1>${text}</h1>`)
        break
      case 'h2':
        result.push(`<h2>${text}</h2>`)
        break
      case 'h3':
        result.push(`<h3>${text}</h3>`)
        break
      case 'h4':
        result.push(`<h4>${text}</h4>`)
        break
      case 'blockquote':
        result.push(`<blockquote>${text}</blockquote>`)
        break
      default:
        result.push(`<p>${text}</p>`)
    }
  })
  
  // Close any remaining open list
  if (currentList) {
    result.push(`<${currentList.tag}>${listItems.join('')}</${currentList.tag}>`)
  }
  
  return result.join('')
}

/**
 * Group list items together for proper ul/ol rendering
 * (No longer needed, but kept for backward compatibility)
 */
function groupListItems(html) {
  return html
}

/**
 * Fetch all off-plan properties from Sanity
 */
export async function getAllOffPlanProperties() {
  // Sanity integration disabled - return empty array
  // Uncomment below and install Sanity packages to enable
  return []
  
  /* DISABLED - Uncomment to enable Sanity
  try {
    // First, check total count of all documents (for debugging)
    const countQuery = `count(*[_type == "offPlanProperty"])`
    const totalCount = await client.fetch(countQuery)
    console.log(`🔍 Total off-plan properties in Sanity: ${totalCount}`)
    
    // Main query - fetches ALL published documents
    const query = `*[_type == "offPlanProperty"] | order(_createdAt desc) {
      _id,
      "slug": slug.current,
      metaTitle,
      metaDescription,
      title,
      fullTitle,
      coverPhoto { asset-> { _id, url } },
      photos[] { asset-> { _id, url } },
      location,
      category,
      rooms,
      area,
      price,
      geography,
      description[] {
        ...,
        markDefs[] {
          ...,
          _type == "link" => {
            _type,
            href
          }
        }
      },
      faqs,
      paymentPlans,
      brochure { asset-> { _id, url } }
    }`

    const properties = await client.fetch(query)
    
    console.log(`📦 Fetched ${properties.length} published properties from Sanity`)
    
    if (properties.length > 0) {
      console.log(`📋 Property slugs found:`, properties.map(p => p.slug))
    }
    
    if (totalCount > properties.length) {
      console.log(`⚠️ Warning: ${totalCount - properties.length} document(s) may be drafts. Make sure all documents are published in Sanity Studio.`)
    }

    return properties.map(property => {
      // Handle cover photo - Sanity returns asset with url after dereferencing
      let coverPhotoUrl = null
      if (property.coverPhoto?.asset?.url) {
        coverPhotoUrl = property.coverPhoto.asset.url
      } else if (property.coverPhoto?.asset) {
        coverPhotoUrl = getImageUrl(property.coverPhoto)
      } else if (typeof property.coverPhoto === 'string') {
        coverPhotoUrl = property.coverPhoto
      }

      // Handle photos array - Sanity returns assets with urls after dereferencing
      const photos = (property.photos || []).map(photo => {
        let photoUrl = null
        if (photo?.asset?.url) {
          photoUrl = photo.asset.url
        } else if (photo?.asset) {
          photoUrl = getImageUrl(photo)
        } else if (typeof photo === 'string') {
          photoUrl = photo
        } else if (photo?.url) {
          photoUrl = photo.url
        }
        // Only return if we have a valid, non-empty URL
        return photoUrl && photoUrl.trim() !== '' ? { url: photoUrl } : null
      }).filter(Boolean)

      // Handle brochure
      let brochureUrl = null
      if (property.brochure?.asset) {
        brochureUrl = property.brochure.asset.url
      }

      // Convert description from portable text to HTML string
      let description = portableTextToHtml(property.description)
      description = groupListItems(description)

      // Handle location - convert string to array format if needed
      let locationArray = []
      if (Array.isArray(property.location)) {
        // Already an array
        locationArray = property.location
      } else if (typeof property.location === 'string') {
        // Convert comma-separated string to array format
        locationArray = property.location
          .split(',')
          .map(loc => loc.trim())
          .filter(loc => loc.length > 0)
          .map(loc => ({ name: loc }))
      }

      return {
        slug: property.slug,
        metaTitle: property.metaTitle || '',
        metaDescription: property.metaDescription || '',
        coverPhoto: coverPhotoUrl ? { url: coverPhotoUrl } : null,
        photos: photos,
        location: locationArray,
        title: property.title || '',
        fullTitle: property.fullTitle || property.title || '',
        category: property.category || '',
        rooms: property.rooms || '',
        area: property.area || '',
        price: property.price || '',
        geography: property.geography || {},
        description: description,
        faqs: property.faqs || [],
        paymentPlans: property.paymentPlans || [],
        brochure: brochureUrl
      }
    })
  } catch (error) {
    console.error('Error fetching off-plan properties from Sanity:', error)
    return null
  }
  */ // END DISABLED
}

/**
 * Fetch a single off-plan property by slug
 */
export async function getOffPlanPropertyBySlug(slug) {
  // Sanity integration disabled - return null
  // Uncomment below and install Sanity packages to enable
  return null
  
  /* DISABLED - Uncomment to enable Sanity
  try {
    const query = `*[_type == "offPlanProperty" && slug.current == $slug][0] {
      _id,
      "slug": slug.current,
      metaTitle,
      metaDescription,
      title,
      fullTitle,
      coverPhoto { asset-> { _id, url } },
      photos[] { asset-> { _id, url } },
      location,
      category,
      rooms,
      area,
      price,
      geography,
      description[] {
        ...,
        markDefs[] {
          ...,
          _type == "link" => {
            _type,
            href
          }
        }
      },
      faqs,
      paymentPlans,
      brochure { asset-> { _id, url } }
    }`

    const property = await client.fetch(query, { slug })

    if (!property) {
      return null
    }

    // Handle cover photo - Sanity returns asset with url after dereferencing
    let coverPhotoUrl = null
    if (property.coverPhoto?.asset?.url) {
      coverPhotoUrl = property.coverPhoto.asset.url
    } else if (property.coverPhoto?.asset) {
      coverPhotoUrl = getImageUrl(property.coverPhoto)
    } else if (typeof property.coverPhoto === 'string') {
      coverPhotoUrl = property.coverPhoto
    }

    // Handle photos array - Sanity returns assets with urls after dereferencing
    const photos = (property.photos || []).map(photo => {
      let photoUrl = null
      if (photo?.asset?.url) {
        photoUrl = photo.asset.url
      } else if (photo?.asset) {
        photoUrl = getImageUrl(photo)
      } else if (typeof photo === 'string') {
        photoUrl = photo
      } else if (photo?.url) {
        photoUrl = photo.url
      }
      // Only return if we have a valid, non-empty URL
      return photoUrl && photoUrl.trim() !== '' ? { url: photoUrl } : null
    }).filter(Boolean)

    // Handle brochure
    let brochureUrl = null
    if (property.brochure?.asset) {
      brochureUrl = property.brochure.asset.url
    }

    // Convert description from portable text to HTML string
    let description = portableTextToHtml(property.description)
    description = groupListItems(description)

    return {
      slug: property.slug,
      metaTitle: property.metaTitle || '',
      metaDescription: property.metaDescription || '',
      coverPhoto: coverPhotoUrl ? { url: coverPhotoUrl } : null,
      photos: photos,
      location: property.location || [],
      title: property.title || '',
      fullTitle: property.fullTitle || property.title || '',
      category: property.category || '',
      rooms: property.rooms || '',
      area: property.area || '',
      price: property.price || '',
      geography: property.geography || {},
      description: description,
      faqs: property.faqs || [],
      paymentPlans: property.paymentPlans || [],
      brochure: brochureUrl
    }
  } catch (error) {
    console.error('Error fetching off-plan property from Sanity:', error)
    return null
  }
  */ // END DISABLED
}

/**
 * Fetch all blog posts from Sanity
 */
export async function getAllBlogs() {
  // Sanity integration disabled - return empty array
  // Uncomment below and install Sanity packages to enable
  return []
  
  /* DISABLED - Uncomment to enable Sanity
  try {
    // First, get total count (including drafts) for debugging
    const totalCountQuery = `count(*[_type == "blog"])`
    const totalCount = await client.fetch(totalCountQuery)
    console.log(`🔍 Total blog documents in Sanity (including drafts): ${totalCount}`)
    
    // Also check drafts count
    const draftsCountQuery = `count(*[_type == "blog" && _id in path("drafts.**")])`
    const draftsCount = await client.fetch(draftsCountQuery)
    console.log(`🔍 Draft blog documents: ${draftsCount}`)
    
    const query = `*[_type == "blog" && !(_id in path("drafts.**"))] | order(date desc) {
      _id,
      "slug": slug.current,
      metaTitle,
      metaDescription,
      title,
      date,
      image {
        asset-> {
          _id,
          url
        }
      },
      details[] {
        ...,
        _type == "table" => {
          _type,
          rows[] {
            cells[] {
              content,
              isHeader
            }
          }
        },
        markDefs[] {
          ...,
          _type == "link" => {
            _type,
            href,
            target
          }
        }
      }
    }`

    const blogs = await client.fetch(query)
    
    console.log(`📦 Total blog documents in Sanity (including drafts): ${totalCount}`)
    console.log(`📦 Draft blog documents: ${draftsCount}`)
    console.log(`📦 Fetched ${blogs.length} published blogs from Sanity`)
    
    if (blogs.length > 0) {
      console.log(`📋 Blog slugs found:`, blogs.map(b => b.slug?.current || b.slug))
      console.log(`📋 Blog titles:`, blogs.map(b => b.title))
      console.log(`📋 Blog IDs:`, blogs.map(b => b._id))
    }
    
    if (totalCount > blogs.length) {
      const missing = totalCount - blogs.length
      console.log(`⚠️ Warning: ${missing} blog document(s) may be drafts or missing required fields. Make sure all documents are published in Sanity Studio.`)
    }
    
    // Debug: Log raw blog data before processing
    if (blogs.length > 0) {
      console.log(`🔍 Raw blogs data (first blog):`, JSON.stringify(blogs[0], null, 2))
    }
    
    return blogs.map(blog => {
      // Handle image - Sanity returns asset with url after dereferencing
      let imageUrl = null
      if (blog.image?.asset?.url) {
        imageUrl = blog.image.asset.url
      } else if (blog.image?.asset) {
        imageUrl = getImageUrl(blog.image)
      } else if (typeof blog.image === 'string') {
        imageUrl = blog.image
      }

      // Convert details from portable text to HTML string
      let details = portableTextToHtml(blog.details)
      details = groupListItems(details)

      // Handle slug - now directly available as string from query
      const slugValue = blog.slug || ''
      
      // Debug: Log each blog being processed
      if (!slugValue) {
        console.warn(`⚠️ Blog missing slug:`, blog._id, blog.title)
      }
      if (!blog.title) {
        console.warn(`⚠️ Blog missing title:`, blog._id, slugValue)
      }

      return {
        slug: slugValue,
        metaTitle: blog.metaTitle || '',
        metaDescription: blog.metaDescription || '',
        title: blog.title || '',
        date: blog.date || '',
        image: imageUrl,
        details: details
      }
    }).filter(blog => {
      // Filter out blogs without required fields
      if (!blog.slug || !blog.title) {
        console.warn(`⚠️ Filtering out blog due to missing required fields:`, blog)
        return false
      }
      return true
    })
  } catch (error) {
    console.error('Error fetching blogs from Sanity:', error)
    return []
  }
  */ // END DISABLED
}

/**
 * Fetch a single blog post by slug from Sanity
 */
export async function getBlogBySlug(slug) {
  // Sanity integration disabled - return null
  // Uncomment below and install Sanity packages to enable
  return null
  
  /* DISABLED - Uncomment to enable Sanity
  try {
    const query = `*[_type == "blog" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
      _id,
      slug,
      metaTitle,
      metaDescription,
      title,
      date,
      image {
        asset-> {
          _id,
          url
        }
      },
      details[] {
        ...,
        _type == "table" => {
          _type,
          rows[] {
            cells[] {
              content,
              isHeader
            }
          }
        },
        markDefs[] {
          ...,
          _type == "link" => {
            _type,
            href,
            target
          }
        }
      }
    }`

    const blog = await client.fetch(query, { slug })
    
    if (!blog) {
      console.log(`❌ No blog found in Sanity for slug: ${slug}`)
      return null
    }

    // Handle image - Sanity returns asset with url after dereferencing
    let imageUrl = null
    if (blog.image?.asset?.url) {
      imageUrl = blog.image.asset.url
    } else if (blog.image?.asset) {
      imageUrl = getImageUrl(blog.image)
    } else if (typeof blog.image === 'string') {
      imageUrl = blog.image
    }

    // Convert details from portable text to HTML string
    let details = portableTextToHtml(blog.details)
    details = groupListItems(details)

    // Handle slug - Sanity returns slug as { current: "slug-value" }
    const slugValue = blog.slug?.current || blog.slug || ''

    return {
      slug: slugValue,
      metaTitle: blog.metaTitle || '',
      metaDescription: blog.metaDescription || '',
      title: blog.title || '',
      date: blog.date || '',
      image: imageUrl,
      details: details
    }
  } catch (error) {
    console.error('Error fetching blog from Sanity:', error)
    return null
  }
  */ // END DISABLED
}
