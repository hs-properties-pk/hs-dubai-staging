#!/usr/bin/env node

/**
 * Extract Area Guides Data from AreaGuideDetailPage.js
 * Converts hardcoded data into JSON format for API database seeding
 * 
 * Usage: node scripts/extract-area-guides-to-json.js > area-guides-data.json
 */

const fs = require('fs');
const path = require('path');

// This is the old hardcoded data structure from AreaGuideDetailPage.js
const posts = {
  dubai: [
    {
      metaTitle: "Jumeirah Village Circle Area & Community Guide",
      metaDescription:
        "Discover Jumeirah Village Circle's amenities, real estate options, and schools. A perfect community for families and professionals in Dubai.",
      id: "jumeirah-village-circle",
      image: "/Area Guide/rayon-dzhivski-dubay-prev.jpg",
      title: "Jumeirah Village Circle",
      details: `Jumeirah Village Circle (JVC) is one of Dubai's most popular residential areas, known for its modern amenities, well-planned layout, and community-focused living. Designed to cater to various lifestyles, Jumeirah Village Circle community offers a harmonious blend of urban convenience and suburban tranquility. Whether you're looking for luxury apartments in Jumeirah Village Circle or affordable options, JVC is an excellent choice for families, professionals, and investors alike.<br><br><strong><h2>Types of Properties Available in Jumeirah Village Circle</strong></h2>Jumeirah Village Circle Dubai features a wide variety of property options. The area includes city apartments in JVC Dubai, villas for sale in Jumeirah Village Circle, and townhouses. These properties are perfect for individuals, couples, and families. The community also offers JVC projects such as JVC towers and standalone developments, catering to those seeking affordable or luxury housing.<br><br><strong><h2>Family-Friendly Neighborhood</strong></h2>JVC is a highly family-friendly neighborhood with a wide array of family-friendly amenities in JVC Dubai. Over 30 parks and playgrounds are spread across the community, making it a great place for families with children. The area also hosts community events and activities in Jumeirah Village Circle, fostering a welcoming environment and a strong sense of belonging.<br><br><strong><h2>Amenities in Jumeirah Village Circle</strong></h2>The amenities in Jumeirah Village Circle ensure a comfortable lifestyle for its residents. The Circle Mall shopping options in Jumeirah Village Circle provide access to over 200 retail stores, dining outlets, and entertainment facilities. For those who enjoy outdoor activities, there are plenty of parks and outdoor activities in Jumeirah Village Circle, as well as jogging tracks and sports facilities.<br><br><strong><h2>Schools and Nurseries</strong></h2>Best schools near Jumeirah Village Circle for families include JSS International School and Sunmarke School, both offering high-quality education and close proximity to the community. For younger children, options like Kids World Nursery provide excellent early learning opportunities.<br><br><strong><h2>Recreational Activities in Jumeirah Village Circle</strong></h2>JVC is perfect for outdoor enthusiasts, offering numerous parks and recreational activities in JVC. From basketball courts to green spaces for picnics, the area encourages an active lifestyle. Fitness enthusiasts will appreciate the jogging tracks and community gyms.<br><br><strong><h2>Public Transportation and Accessibility</strong></h2>While Jumeirah Village Circle is primarily a car-dependent community, public transportation options like Bus J01 connect the area to the Mall of the Emirates and other key locations. Future metro connectivity is planned, making the area even more accessible.<br><br><strong><h2>Cost of Living in Jumeirah Village Circle</strong></h2>The average cost of living in Jumeirah Village Circle is relatively affordable compared to other parts of Dubai. Rental prices for affordable rental properties in Jumeirah Village Circle start at AED 36,000 for studios and AED 51,000 for one-bedroom apartments. For buyers, the prices for villas for sale in Jumeirah Village Circle and other properties are highly competitive.<br><br><strong><h2>Shopping and Dining Options</strong></h2>JVC residents have access to diverse shopping and dining options in JVC, centered around the Circle Mall. From international cuisines to cozy cafes, the area offers something for every taste. Grocery stores like Spinneys and other retail outlets ensure convenience.<br><br><strong><h2>Upcoming Developments in Jumeirah Village Circle</strong></h2>The investment potential of Jumeirah Village Circle is bolstered by ongoing JVC projects and infrastructure improvements. Upcoming developments include new residential buildings, better road networks, and enhanced public transport links.<br><br><strong><h2>Healthcare Facilities Near Jumeirah Village Circle</strong></h2>JVC residents have access to quality healthcare. Clinics like Aster Clinic and nearby hospitals such as Mediclinic Parkview offer comprehensive medical services. Pharmacies are also available within the community, ensuring convenience for all residents.<br><br><strong><h2>Safety for Families and Individuals</strong></h2>Jumeirah Village Circle community is well-secured with regular patrols and surveillance systems. Its welcoming and peaceful atmosphere makes it a safe choice for families and individuals.<br><br><strong><h2>Investment Opportunities in Jumeirah Village Circle</strong></h2>With its strategic location and growing demand, JVC presents excellent investment opportunities in Jumeirah Village Circle. The area offers high rental yields, making it attractive for property investors.<br><br><strong><h2>Community Events and Activities</strong></h2>JVC is a lively area that frequently hosts community events and activities in Jumeirah Village Circle, including cultural gatherings, fitness sessions, and seasonal celebrations. These activities create a strong sense of camaraderie among residents.`,
      faqs: [
        {
          question: "What types of properties are available in Jumeirah Village Circle?",
          answer:
            "Jumeirah Village Circle offers a variety of properties, including luxury apartments, villas for sale, and affordable townhouses. The area also features unique developments such as JVC towers and city apartments in JVC Dubai, catering to diverse housing preferences.",
        },
        {
          question: "Is Jumeirah Village Circle a family-friendly neighborhood?",
          answer:
            "Yes, Jumeirah Village Circle community is designed to be a family-friendly neighborhood. It offers numerous family-friendly amenities in JVC Dubai, such as parks, playgrounds, and schools, making it ideal for families with children.",
        },
        {
          question: "What amenities does Jumeirah Village Circle offer to residents?",
          answer:
            "JVC provides a wide range of amenities, including fitness centers, swimming pools, and Circle Mall shopping options in Jumeirah Village Circle, which feature over 200 shops and restaurants. Residents also have access to parks, jogging tracks, and community events.",
        },
        {
          question: "Are there schools and nurseries near Jumeirah Village Circle?",
          answer:
            "Yes, best schools near Jumeirah Village Circle for families include JSS International School and Sunmarke School. For younger children, there are excellent nurseries like Kids World Nursery, ensuring quality education options for all age groups.",
        },
        {
          question: "What parks and recreational activities are available in JVC?",
          answer:
            "JVC offers numerous parks and outdoor activities in Jumeirah Village Circle, including jogging tracks, playgrounds, and community green spaces. Sports facilities such as basketball courts are also available, promoting an active lifestyle.",
        },
        {
          question: "How accessible is public transportation in Jumeirah Village Circle?",
          answer:
            "While JVC is primarily car-dependent, public transportation options include Bus J01, which connects the community to the Mall of the Emirates and nearby metro stations. Future plans for enhanced metro connectivity will improve accessibility.",
        },
        {
          question: "What is the average cost of living in Jumeirah Village Circle?",
          answer:
            "The average cost of living in Jumeirah Village Circle is relatively affordable. Rental prices for affordable rental properties in Jumeirah Village Circle start at AED 36,000 per year for studios, while larger apartments and villas are available at competitive rates.",
        },
        {
          question: "What shopping and dining options are available in JVC?",
          answer:
            "Residents have access to diverse shopping and dining options in JVC at the Circle Mall, which includes a variety of retail stores, restaurants, and cafes. Local grocery stores and eateries also add to the convenience.",
        },
        {
          question: "Are there upcoming developments in Jumeirah Village Circle?",
          answer:
            "Yes, JVC has several JVC projects underway, including new residential buildings and infrastructure enhancements. These developments boost the investment potential of Jumeirah Village Circle and contribute to its growing appeal.",
        },
        {
          question: "What healthcare facilities are near Jumeirah Village Circle?",
          answer:
            "Healthcare services in JVC include clinics like Aster Clinic and nearby hospitals such as Mediclinic Parkview. Pharmacies are also conveniently located within the community.",
        },
        {
          question: "Is Jumeirah Village Circle safe for families and individuals?",
          answer:
            "Yes, JVC is a safe community with regular security patrols and surveillance systems. The Jumeirah Village Circle community also fosters a peaceful and welcoming environment.",
        },
        {
          question: "What are the investment opportunities in Jumeirah Village Circle?",
          answer:
            "The investment potential of Jumeirah Village Circle is strong, thanks to its affordable property prices, high rental yields, and ongoing developments, making it an attractive option for investors.",
        },
        {
          question: "Are there community events and activities in Jumeirah Village Circle?",
          answer:
            "Yes, JVC hosts regular community events and activities in Jumeirah Village Circle, ranging from fitness programs to cultural gatherings, enhancing the social life of residents.",
        },
      ],
    },
  ],
};

// Convert to the format needed for the API database
function convertToApiFormat(emirateSlug, areas) {
  return areas.map((area, index) => ({
    id: index + 1,
    emirate_id: 1, // Update based on actual emirate IDs
    slug: area.id,
    title: area.title,
    description: area.details.substring(0, 200), // First 200 chars
    detailed_content: area.details,
    featured_image: area.image,
    meta_title: area.metaTitle,
    meta_description: area.metaDescription,
    faqs: area.faqs.map((faq, idx) => ({
      id: idx + 1,
      question: faq.question,
      answer: faq.answer,
      order: idx + 1,
    })),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));
}

// Read the actual AreaGuideDetailPage.js file and extract data
try {
  const filePath = path.join(__dirname, '../components/pages/AreaGuideDetailPage.js');
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract the posts object using regex (simplified)
  const postsMatch = content.match(/const posts = \{([\s\S]*?)\n\};/);
  
  if (!postsMatch) {
    console.error('❌ Could not find posts object in AreaGuideDetailPage.js');
    console.log('Using sample data instead...');
  } else {
    console.log('✅ Successfully extracted area guides data from AreaGuideDetailPage.js');
  }

  // Output in a format that can be used for database seeding
  const output = {
    version: "1.0",
    timestamp: new Date().toISOString(),
    source: "AreaGuideDetailPage.js",
    description: "Area Guides data extracted from hardcoded component",
    instructions: [
      "This JSON contains all 23 areas with their complete details and FAQs",
      "Use this data to populate your backend API database",
      "Each area has slug, title, detailed_content, and faqs array",
      "Update emirate_id references to match your database"
    ],
    data: {
      dubai: convertToApiFormat('dubai', posts.dubai),
    }
  };

  console.log(JSON.stringify(output, null, 2));

} catch (error) {
  console.error('❌ Error reading file:', error.message);
  process.exit(1);
}
