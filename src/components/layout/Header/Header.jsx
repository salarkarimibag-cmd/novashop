import TopHeader from "./TopHeader";
import SearchBox from "./SearchBox";
import Navbar from "@/components/layout/Navbar";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm">
      <TopHeader />
      <SearchBox />

      <Navbar />
    </header>
  );
}
