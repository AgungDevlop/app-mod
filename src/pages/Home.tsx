import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

interface AppPost {
  icon: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  date: string;
  slug: string;
  category: string;
  type: string;
  version: string; // Add version property
}

export function Home() {
  const [posts, setPosts] = useState<AppPost[]>([]);
  const [originalPosts, setOriginalPosts] = useState<AppPost[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("../../databases/app.json");
        const data: AppPost[] = await response.json();

        setOriginalPosts(data);
        setPosts(shuffleArray(data));

        const uniqueCategories = Array.from(new Set(data.map((post) => post.category)));
        setCategories(uniqueCategories);

        const uniqueTypes = Array.from(new Set(data.map((post) => post.type)));
        setTypes(uniqueTypes);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const shuffleArray = (array: AppPost[]): AppPost[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const filterPosts = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredPosts = originalPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(lowerCaseQuery) ||
        post.shortDescription.toLowerCase().includes(lowerCaseQuery) ||
        post.longDescription.toLowerCase().includes(lowerCaseQuery);
      const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
      const matchesType = selectedType ? post.type === selectedType : true;

      return matchesSearch && matchesCategory && matchesType;
    });

    setPosts(filteredPosts);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query === "") {
      setPosts(originalPosts); // Reset to original posts if input is cleared
    } else {
      filterPosts();
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    filterPosts();
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
    filterPosts();
  };

  useEffect(() => {
    filterPosts(); // Re-filter posts when searchQuery, selectedCategory, or selectedType changes
  }, [searchQuery, selectedCategory, selectedType]);

  return (
    <div className="container mx-auto px-4 py-6">

      {/* Filter Section */}
      <div className="flex mb-6 space-x-4">
        <select
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Pilih Kategori</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option value="">Pilih App/Game</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Search Bar */}
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Cari aplikasi..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="flex-1 border border-gray-300 rounded-lg p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          className="bg-green-600 text-white rounded-lg p-2 hover:bg-green-700 transition duration-200"
          onClick={filterPosts}
        >
          <BiSearch className="w-5 h-5" />
        </button>
      </div>

      {/* Featured Apps Section */}
      <section className="mb-6">
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug} className="relative bg-white rounded-lg shadow-lg p-4 flex justify-between items-center hover:shadow-xl transition-shadow duration-200">
              {/* Advertisement-Style Label in the top left corner */}
              <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-1 py-0.5 rounded-br-lg shadow-lg">
                Mod
              </div>

              <div className="flex items-center space-x-4">
                {/* Rounded Full Icon with Border */}
                <img
                  src={post.icon}
                  alt={post.title}
                  className="w-16 h-16 object-cover rounded-full border-2 border-gray-300 shadow"
                />
                <div className="flex-1">
                  {/* Smaller Title with Text Truncation */}
                  <h3 className="text-sm font-bold text-black truncate">{post.title}</h3>
                  <p className="text-gray-500 text-sm">{post.category} - {post.type}</p>
                  <p className="text-gray-600 text-xs">{post.date}</p>
                </div>
              </div>
              <Link to={`/app-mod/apps/${post.slug}`}>
                <button className="bg-green-600 text-white text-xs py-1 px-2 rounded hover:bg-green-700 transition duration-200">
                  Download
                </button>
              </Link>
              {/* Version display in the bottom right corner */}
              <span className="absolute bottom-2 right-2 text-gray-500 text-xs">
                Version: {post.version} {/* Displaying the version */}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

