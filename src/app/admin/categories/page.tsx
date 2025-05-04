"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CategoryTable } from "@/components/category-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}category`);
      setCategories(data?.data);
    } catch (error) {
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (categoryId: string) => {
    router.push(`/admin/categories/${categoryId}`);
  };

  const handleDelete = async (categoryId: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}category/${categoryId}`);
      toast.success("Category deleted successfully");
      setCategories((prev) => prev.filter((cat: any) => cat.id !== categoryId));
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button onClick={() => router.push("/admin/categories/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <CategoryTable categories={categories} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}
