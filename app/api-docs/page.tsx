// "use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getApiConfig } from "@/lib/api-config"

export default async function ApiDocsPage() {
  const config = await getApiConfig()

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" className="pl-0">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">API Documentation</h1>
          <p className="text-muted-foreground">Learn how to integrate your content with any website</p>
        </div>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Basic information about the API</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              This API allows you to fetch content and categories from your CMS to display on any website. The API is
              secured with an API key that you can configure in the API Configuration page.
            </p>

            <div className="space-y-2">
              <h3 className="font-semibold">Base URL</h3>
              <div className="p-2 bg-muted rounded-md font-mono text-sm overflow-x-auto">
                {typeof window !== "undefined" ? window.location.origin : ""}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Authentication</h3>
              <p>All API requests require an API key, which should be included as a query parameter:</p>
              <div className="p-2 bg-muted rounded-md font-mono text-sm overflow-x-auto">?apiKey={config.apiKey}</div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="fetch">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="fetch">Fetch API</TabsTrigger>
            <TabsTrigger value="react">React</TabsTrigger>
            <TabsTrigger value="vanilla">Vanilla JS</TabsTrigger>
          </TabsList>

          <TabsContent value="fetch" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Using Fetch API</CardTitle>
                <CardDescription>Modern JavaScript approach</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Fetching Content</h3>
                    <pre className="p-4 bg-muted rounded-md font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                      {`// Fetch all content
fetch("${typeof window !== "undefined" ? window.location.origin : ""}/api/content?apiKey=${config.apiKey}")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Process your content data here
  })
  .catch(error => console.error("Error fetching content:", error));`}
                    </pre>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">Fetching Categories</h3>
                    <pre className="p-4 bg-muted rounded-md font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                      {`// Fetch all categories
fetch("${typeof window !== "undefined" ? window.location.origin : ""}/api/categories?apiKey=${config.apiKey}")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Process your categories data here
  })
  .catch(error => console.error("Error fetching categories:", error));`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="react" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Using React</CardTitle>
                <CardDescription>React component examples</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Content Component</h3>
                    <pre className="p-4 bg-muted rounded-md font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                      {`import { useState, useEffect } from 'react';

function ContentList() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch content when component mounts
    fetch("${typeof window !== "undefined" ? window.location.origin : ""}/api/content?apiKey=${config.apiKey}")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setContent(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading content...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Content</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {content.map(item => (
          <div key={item.id} className="border rounded-lg p-4">
            <img 
              src={item.imageUrl || "/placeholder.svg"} 
              alt={item.title} 
              className="w-full h-48 object-cover rounded-md mb-2" 
            />
            <h3 className="text-xl font-bold">{item.title}</h3>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {item.category}
            </span>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentList;`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vanilla" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Using Vanilla JavaScript</CardTitle>
                <CardDescription>Plain JavaScript implementation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">HTML Structure</h3>
                    <pre className="p-4 bg-muted rounded-md font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                      {`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <h1>My Website</h1>
    <nav id="categories-nav"></nav>
  </header>
  
  <main>
    <div id="content-container" class="content-grid"></div>
  </main>
  
  <script src="script.js"></script>
</body>
</html>`}
                    </pre>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">JavaScript Implementation</h3>
                    <pre className="p-4 bg-muted rounded-md font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                      {`// Constants
const API_URL = "${typeof window !== "undefined" ? window.location.origin : ""}";
const API_KEY = "${config.apiKey}";

// DOM Elements
const contentContainer = document.getElementById('content-container');
const categoriesNav = document.getElementById('categories-nav');

// Fetch and display categories
async function fetchCategories() {
  try {
    const response = await fetch(\`\${API_URL}/api/categories?apiKey=\${API_KEY}\`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    
    const categories = await response.json();
    
    // Create "All" category link
    const allLink = document.createElement('a');
    allLink.href = '#';
    allLink.textContent = 'All';
    allLink.classList.add('category-link', 'active');
    allLink.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.category-link').forEach(link => link.classList.remove('active'));
      allLink.classList.add('active');
      fetchContent();
    });
    categoriesNav.appendChild(allLink);
    
    // Create category links
    categories.forEach(category => {
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = category.name;
      link.classList.add('category-link');
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.category-link').forEach(link => link.classList.remove('active'));
        link.classList.add('active');
        fetchContent(category.name);
      });
      categoriesNav.appendChild(link);
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    categoriesNav.innerHTML = '<p>Failed to load categories</p>';
  }
}

// Fetch and display content
async function fetchContent(category = null) {
  try {
    const response = await fetch(\`\${API_URL}/api/content?apiKey=\${API_KEY}\`);
    if (!response.ok) throw new Error('Failed to fetch content');
    
    let content = await response.json();
    
    // Filter by category if specified
    if (category) {
      content = content.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }
    
    // Clear existing content
    contentContainer.innerHTML = '';
    
    if (content.length === 0) {
      contentContainer.innerHTML = '<p class="no-content">No content found</p>';
      return;
    }
    
    // Create content cards
    content.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('content-card');
      
      card.innerHTML = \`
        <div class="card-image">
          <img src="\${item.imageUrl}" alt="\${item.title}">
        </div>
        <div class="card-content">
          <h2>\${item.title}</h2>
          <span class="category-badge">\${item.category}</span>
          <p>\${item.content}</p>
          <span class="date">\${new Date(item.createdAt).toLocaleDateString()}</span>
        </div>
      \`;
      
      contentContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    contentContainer.innerHTML = '<p class="error">Failed to load content</p>';
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  fetchCategories();
  fetchContent();
});`}
                    </pre>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">CSS Styling</h3>
                    <pre className="p-4 bg-muted rounded-md font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                      {`/* Basic styling for the content display */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  margin-bottom: 30px;
}

#categories-nav {
  display: flex;
  gap: 15px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.category-link {
  text-decoration: none;
  color: #555;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.category-link:hover {
  background-color: #f0f0f0;
}

.category-link.active {
  background-color: #333;
  color: white;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.content-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.content-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.card-image {
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  padding: 15px;
}

.card-content h2 {
  margin-top: 0;
  margin-bottom: 10px;
}

.category-badge {
  display: inline-block;
  background-color: #f0f0f0;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-bottom: 10px;
}

.date {
  display: block;
  font-size: 0.8rem;
  color: #777;
  margin-top: 10px;
}

.no-content, .error {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.error {
  color: #d32f2f;
  background-color: #ffebee;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>API Response Format</CardTitle>
            <CardDescription>Structure of the API responses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Content Response</h3>
              <pre className="p-4 bg-muted rounded-md font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                {`[
  {
    "id": "string",
    "title": "string",
    "category": "string",
    "content": "string",
    "imageUrl": "string",
    "createdAt": "string (ISO date)"
  },
  // More content items...
]`}
              </pre>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Categories Response</h3>
              <pre className="p-4 bg-muted rounded-md font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                {`[
  {
    "id": "string",
    "name": "string"
  },
  // More category items...
]`}
              </pre>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Error Response</h3>
              <pre className="p-4 bg-muted rounded-md font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                {`{
  "error": "string"
}`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
