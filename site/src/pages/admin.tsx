import Layout from "@theme/Layout";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const existingScript = document.querySelector("script[data-decap-cms]");
    if (existingScript) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js";
    script.async = true;
    script.dataset.decapCms = "true";
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);
  }, []);

  return (
    <Layout title="内容上传后台" description="AI Digital Textbook content studio inbox">
      <main className="product-page product-page--narrow">
        <section className="page-hero">
          <span className="product-eyebrow">Content Studio</span>
          <h1>内容上传后台</h1>
          <p>这里用于把新笔记和素材提交到内容收件箱。后台配置仍走 GitHub Pages 静态文件，后续可以升级为更完整的内容工作台。</p>
        </section>
        <div className="admin-loader">{loaded ? "后台脚本已加载" : "正在加载上传后台..."}</div>
      </main>
    </Layout>
  );
}
