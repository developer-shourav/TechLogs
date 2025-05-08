import BlogDetailsCard from "@/components/ui/BlogDetailsCard";
import { Blog } from "@/types";

/* ------------For Pre Static Build like SSG (Static Site Generation)--------------- */

export const generateStaticParams = async () => {
  const res = await fetch("http://localhost:5000/blogs");
  const blogs = await res.json();

  return blogs?.slice(0, 3).map((blog: Blog) => ({
    blogId: blog.id,
  }));
};

/* ----------------Generate Dynamic Metadata--------------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;

  const res = await fetch(`http://localhost:5000/blogs/${blogId}`);
  const blog = await res.json();
  return {
    title: blog?.title,
    description: blog?.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [
        {
          url: blog.blog_image || "/default-og.png",
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
  };
}

const BlogDetails = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const { blogId } = await params;

  const res = await fetch(`http://localhost:5000/blogs/${blogId}`);
  const blog = await res.json();
  return (
    <div className="my-10">
      <BlogDetailsCard blog={blog} />
    </div>
  );
};

export default BlogDetails;
