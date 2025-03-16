"use client";

import React, { useEffect, useState } from "react";
import { Pencil, Trash } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


interface Category {
  _id: string;
  title: string;
  banner: string;
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

      async function fetchCategories() {
      try {
        const res = await axios.get("/api/categories");
        setCategories(res.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }
  useEffect(() => {

    fetchCategories();
  }, []);

  const handleEdit = (id: string) => {
    console.log("Edit category:", id);
    // Redirect to edit page or open modal
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this category?");
    if (!confirmDelete) return;

    try {
      const deleted = await axios.delete(`/api/categories/${id}`);

      if(!deleted?.status)
      {
        toast.error("Failed To Delete !!");
        return ;
      }
    fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
       toast.error("Failed To Delete !!");

    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Banner</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category._id} className="border-t">
                    <td className="p-3">
                      <Image
                        src={category?.banner?.secure_url || "/placeholder.svg"}
                        alt={category.title}
                        width={60}
                        height={60}
                        className="rounded-md object-cover"
                      />
                    </td>
                    <td className="p-3">{category.title}</td>
                    <td className="p-3 flex justify-center gap-4">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(category._id)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(category._id)}>
                        <Trash className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-3 text-center">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const page = () => {
    return (
        <div>
        <CategoriesPage/>
        </div>
    )
}








export default page
