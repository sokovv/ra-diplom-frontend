import TopSales from "./TopSales";
import Catalog from "./Catalog";

export default function HomePage() {
  return (
    <section className=" container">
      <article className="article">
        <TopSales></TopSales>
      </article>
      <article className="article">
        <Catalog ></Catalog>
      </article>
    </section>
  );
}
