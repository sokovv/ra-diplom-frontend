import TopSales from "./TopSales";
import CatalogMain from "./CatalogMain";


export default function HomePage() {
  return (
      <section className=" container">
        <article className="article">
          <TopSales></TopSales>
        </article>
        <article className="article">
          <CatalogMain></CatalogMain>
        </article>
      </section>
  );
}
