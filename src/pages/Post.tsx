import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface AppPost {
  icon: string;
  banner: string;
  images: string[];
  title: string;
  slug: string;
  version: string;
  features: string[];
  size: string;
  date: string;
  price: string;
  developer: string;
  shortDescription: string;
  longDescription: string;
  download: string[];
  category: string;
  type: string;
  minVersion: string;
  package: string;
}

export const Post = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<AppPost | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showDownloadLinks, setShowDownloadLinks] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      const response = await fetch("../../databases/app.json");
      const data: AppPost[] = await response.json();
      const foundPost = data.find((item) => item.slug === slug);
      setPost(foundPost || null);

      if (foundPost) {
        // Update document title
        document.title = foundPost.title;

        // Update favicon
        const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement;
        if (favicon) {
          favicon.href = foundPost.icon;
        }

        // Open Graph meta tags
        const metaTags = [
          { property: "og:title", content: foundPost.title },
          { property: "og:description", content: foundPost.shortDescription },
          { property: "og:image", content: foundPost.icon },
          { property: "og:url", content: window.location.href },
          { property: "og:type", content: "website" }
        ];

        metaTags.forEach(({ property, content }) => {
          let meta = document.querySelector(`meta[property='${property}']`) as HTMLMetaElement;
          if (!meta) {
            meta = document.createElement("meta");
            meta.setAttribute("property", property);
            document.head.appendChild(meta);
          }
          meta.content = content;
        });
      }
    };

    fetchPostData();
  }, [slug]);

  const handleDownloadClick = () => {
    setIsDownloading(true);
    setProgress(0);
    setShowDownloadLinks(false); // Hide download links initially

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          setShowDownloadLinks(true); // Show download links after loading
          return 100;
        }
        return prevProgress + 10;
      });
    }, 1000);
  };

  if (!post) {
    return (
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-center">Post tidak ditemukan.</h1>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      {/* Icon Back */}
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="text-blue-600 flex items-center">
          <span className="mr-2">←</span> Home
        </button>
      </div>

      <div className="p-6 mb-6">
        <div className="flex flex-col items-start mb-4">
          <h1 className="text-2xl font-bold">
            <span className="text-blue-600">Download {post.title}</span>
            <span className="text-pink-600"> Mod Apk ({post.features.join(", ")})</span>
            <span className="text-green-600"> V {post.version}</span>
          </h1>
        </div>

        {/* Banner with Reduced Height */}
        <img src={post.banner} alt={post.title} className="w-full h-40 object-cover rounded-lg mb-4" />

        <div className="overflow-x-auto mb-4">
          <div className="flex space-x-4">
            {post.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 object-cover rounded-lg shadow-md"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h2 className="font-semibold">Name:</h2>
            <p className="text-gray-700">{post.title}</p>
          </div>
          <div>
            <h2 className="font-semibold">Category:</h2>
            <p className="text-gray-700">{post.category}</p>
          </div>
          <div>
            <h2 className="font-semibold">Publisher:</h2>
            <p className="text-gray-700">{post.developer}</p>
          </div>
          <div>
            <h2 className="font-semibold">Version:</h2>
            <p className="text-gray-700">{post.version}</p>
          </div>
          <div>
            <h2 className="font-semibold">Size:</h2>
            <p className="text-gray-700">{post.size}</p>
          </div>
          <div>
            <h2 className="font-semibold">Price:</h2>
            <p className="text-gray-700">{post.price}</p>
          </div>
          <div>
            <h2 className="font-semibold">Requires:</h2>
            <p className="text-gray-700">{post.minVersion}</p>
          </div>
          <div>
            <h2 className="font-semibold">Package Name:</h2>
            <p className="text-gray-700">{post.package}</p>
          </div>
          <div>
            <h2 className="font-semibold">Download Link:</h2>
            <p className="text-gray-700">Available</p>
          </div>
          <div>
            <h2 className="font-semibold">Type:</h2>
            <p className="text-gray-700">{post.type}</p>
          </div>
        </div>

        {/* Download Button with Progress Bar */}
        <div className="my-4">
          {!isDownloading ? (
            <button
              className="bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg w-full max-w-xs mx-auto transition-transform transform hover:scale-105"
              onClick={handleDownloadClick}
            >
              Download
            </button>
          ) : (
            <div className="w-full max-w-xs mx-auto bg-gray-300 rounded-full h-6">
              <div
                className="bg-blue-500 h-6 rounded-full text-white font-semibold flex items-center justify-center text-sm"
                style={{ width: `${progress}%` }}
              >
                {progress}%
              </div>
            </div>
          )}
        </div>

        {/* Message after Progress */}
        {progress === 100 && (
          <div className="text-center my-4">
            <p className="text-green-600 italic">»Link Download Siap Silahkan Scrol Ke Bawah«</p>
          </div>
        )}

        <hr className="my-4" />

        <h2 className="text-xl font-bold mb-2">Introduction {post.title}</h2>
        <p className="text-gray-700 mb-4">{post.shortDescription}</p>

        <div id="download-section">
          <h2 className="text-xl font-bold mb-2">What is Apk {post.title}?</h2>
          <p className="text-gray-700">{post.longDescription}</p>
        </div>

        {/* New Subtitles and Paragraphs */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Apakah Aplikasi {post.title} Aman?</h2>
          <p className="text-gray-700 mb-4">
            Aplikasi {post.title} dijamin aman, kalian pasti akan sangat suka menggunakan aplikasi {post.title} ini. Jadi buruan download, tunggu apa lagi!
          </p>

          <h2 className="text-xl font-bold mb-2">Mengapa Memilih {post.title}?</h2>
          <p className="text-gray-700">
            {post.title} menawarkan berbagai fitur menarik dan kemudahan penggunaan yang membuat pengalaman kalian semakin menyenangkan. Ayo, coba sekarang!
          </p>
        </div>

        {/* Fitur yang Ditawarkan */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Fitur yang Ditawarkan {post.title}</h2>
          <ul className="list-disc list-inside mb-4">
            {post.features.map((feature, index) => (
              <li key={index} className="text-gray-700">
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Download Links Section */}
        {showDownloadLinks && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Link Download {post.title}</h2>
            <div className="flex flex-col space-y-2">
              {post.download.map((link, index) => (
                <a key={index} href={link} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white py-2 px-4 rounded-lg">
                  Download Link {index + 1}
                </a>
              ))}
            </div>
          </div>
        )}
        
                {/* Conclusion Section */}
        <h2 className="text-xl font-bold mb-2">Kesimpulan</h2>
        <p className="text-gray-700 mb-4">
          Dengan berbagai fitur dan kemudahan yang ditawarkan, {post.title} adalah pilihan tepat bagi kalian yang mencari aplikasi berkualitas. Jangan lewatkan kesempatan untuk mencoba dan nikmati setiap fiturnya!
        </p>
        
      </div>
    </div>
  );
};
