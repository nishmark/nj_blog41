import { PrismaClient } from '@prisma/client';
import PostPreview from "./components/PostPreview";
import Dropdown from "./components/Dropdown";

const prisma = new PrismaClient();

async function getSortedBlogs(searchParams) {
 
  const params = await searchParams;   // Now has: { sortBy: 'title', sortOrder: 'asc' }
  
 
  const sortBy = params?.sortBy || 'createdAt';   // Get sorting parameters from URL
  const sortOrder = params?.sortOrder || 'desc';
  

  const validSortFields = ['title', 'author', 'createdAt', 'date'];    // Validate sortBy to prevent injection attacks
  const validSortOrders = ['asc', 'desc'];
  
  const finalSortBy = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
  const finalSortOrder = validSortOrders.includes(sortOrder) ? sortOrder : 'desc';
  
  // Apply sorting to database query
  const blogs = await prisma.blog.findMany({
    orderBy: {
      [finalSortBy]: finalSortOrder,
    },
  });
  
  return { blogs, finalSortBy, finalSortOrder };
}


export default async function Home({ searchParams }) {
  const { blogs, finalSortBy, finalSortOrder } = await getSortedBlogs(searchParams); 
  
  return (
    <div>
      <div className="flex justify-end mt-4 mr-20">
        <Dropdown currentSortBy={finalSortBy} currentSortOrder={finalSortOrder} />
      </div>
      <PostPreview blogs={blogs} />
    </div>
  );
}
