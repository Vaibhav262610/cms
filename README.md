# Dynamic Content Management System

This is a headless CMS that allows you to manage content and expose it via an API to any website. The system is designed to be completely dynamic, with no environment variables required.

## Features

- Content management with title, category, content text, and image URLs
- Dynamic category management
- API with CORS support for cross-origin requests
- API key authentication
- Dashboard showing recently added content
- Comprehensive API documentation

## Getting Started

1. Clone and deploy this repository
2. Access the CMS admin panel
3. Add your content and categories
4. Configure your API settings
5. Use the API endpoints in your main website

## How to Fetch Data in Your Main Website

You can fetch data from this CMS in any website using the provided API endpoints. Here's how to do it:

### 1. Get Your API Key

After deploying the CMS, go to the "API Configuration" page to get your API key. This key is required for all API requests.

### 2. Fetch Content

Here's a simple example of how to fetch content in your main website:

\`\`\`javascript
// Replace with your CMS URL and API key
const CMS_URL = "https://your-cms-url.com";
const API_KEY = "your-api-key";

// Fetch all content
fetch(`${CMS_URL}/api/content?apiKey=${API_KEY}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Process your content data here
    // Example: Render content cards
    const contentContainer = document.getElementById('content');
    
    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'content-card';
      
      card.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.title}">
        <h2>${item.title}</h2>
        <span class="category">${item.category}</span>
        <p>${item.content}</p>
      `;
      
      contentContainer.appendChild(card);
    });
  })
  .catch(error => console.error("Error fetching content:", error));
\`\`\`

### 3. Fetch Categories

You can also fetch categories to create navigation or filtering:

\`\`\`javascript
// Fetch all categories
fetch(`${CMS_URL}/api/categories?apiKey=${API_KEY}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Process your categories data here
    // Example: Create category filters
    const categoriesContainer = document.getElementById('categories');
    
    data.forEach(category => {
      const button = document.createElement('button');
      button.textContent = category.name;
      button.className = 'category-button';
      
      button.addEventListener('click', () => {
        // Filter content by category
        filterContentByCategory(category.name);
      });
      
      categoriesContainer.appendChild(button);
    });
  })
  .catch(error => console.error("Error fetching categories:", error));

// Function to filter content by category
function filterContentByCategory(categoryName) {
  // Fetch all content
  fetch(`${CMS_URL}/api/content?apiKey=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      // Filter content by category
      const filteredContent = data.filter(item => 
        item.category.toLowerCase() === categoryName.toLowerCase()
      );
      
      // Render filtered content
      renderContent(filteredContent);
    })
    .catch(error => console.error("Error filtering content:", error));
}

// Function to render content
function renderContent(contentItems) {
  const contentContainer = document.getElementById('content');
  contentContainer.innerHTML = ''; // Clear existing content
  
  contentItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'content-card';
    
    card.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.title}">
      <h2>${item.title}</h2>
      <span class="category">${item.category}</span>
      <p>${item.content}</p>
    `;
    
    contentContainer.appendChild(card);
  });
}
\`\`\`

### 4. React Implementation

If you're using React in your main website, here's how you can implement it:

\`\`\`jsx
import { useState, useEffect } from 'react';

// Content component
function ContentList() {
  const [content, setContent] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Replace with your CMS URL and API key
  const CMS_URL = "https://your-cms-url.com";
  const API_KEY = "your-api-key";
  
  // Fetch content
  useEffect(() => {
    fetch(`${CMS_URL}/api/content?apiKey=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setContent(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching content:", error);
        setLoading(false);
      });
  }, []);
  
  // Fetch categories
  useEffect(() => {
    fetch(`${CMS_URL}/api/categories?apiKey=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, []);
  
  // Filter content by category
  const filteredContent = activeCategory
    ? content.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase())
    : content;
  
  // Handle category click
  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
  };
  
  // Reset category filter
  const handleResetFilter = () => {
    setActiveCategory(null);
  };
  
  if (loading) return <div>Loading content...</div>;
  
  return (
    <div>
      {/* Category filters */}
      <div className="categories">
        <button 
          className={`category-button ${activeCategory === null ? 'active' : ''}`}
          onClick={handleResetFilter}
        >
          All
        </button>
        
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-button ${activeCategory === category.name ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Content grid */}
      <div className="content-grid">
        {filteredContent.length === 0 ? (
          <p>No content found</p>
        ) : (
          filteredContent.map(item => (
            <div key={item.id} className="content-card">
              <img src={item.imageUrl || "/placeholder.svg"} alt={item.title} />
              <h2>{item.title}</h2>
              <span className="category">{item.category}</span>
              <p>{item.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ContentList;
\`\`\`

## API Endpoints

The CMS provides the following API endpoints:

- **GET /api/content** - Get all content items
- **GET /api/categories** - Get all categories

All endpoints require the `apiKey` query parameter.

## CORS Configuration

By default, CORS is enabled with "*" allowed origin, which means any website can access your API. If you want to restrict access to specific domains:

1. Go to the "API Configuration" page
2. Add your website's domain to the "Allowed Origins" list

## Customization

You can customize the CMS to fit your needs:

- Add more fields to content items
- Create custom API endpoints
- Implement additional features like search or pagination

## Troubleshooting

If you encounter issues with the API:

1. Check that you're using the correct API key
2. Verify that CORS is properly configured
3. Check the network tab in your browser's developer tools for error messages

## License

This project is open source and available under the MIT License.
