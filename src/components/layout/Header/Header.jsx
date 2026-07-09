import TopHeader from "./TopHeader";
import SearchBox from "./SearchBox";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm">
      <TopHeader />
      <SearchBox />
    </header>
  );
}