/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * Currently disabled. Uncomment imports below to enable Sanity Studio.
 */

// import { NextStudio } from 'next-sanity/studio'
// import config from '../../../sanity.config'

export const dynamic = 'force-static'

// export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Sanity Studio Disabled</h1>
      <p>Uncomment Sanity imports in this file to enable the studio.</p>
    </div>
  )
}
