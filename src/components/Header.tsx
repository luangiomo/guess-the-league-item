function Header() {
  return (
    <header className="w-full border-b border-b-[#333333]">
      <nav className="mx-auto flex h-16 w-full items-center justify-between px-6 lg:w-[1024px]">
        <a className="font-medium text-[#888888] hover:text-white" href="">
          GTLI
        </a>
        <ul className="flex items-center gap-6 font-medium text-[#888888]">
          <li className="hover:text-white">
            <a className="text-sm" href="">
              How to play
            </a>
          </li>
          <li className="hover:text-white">
            <a className="text-sm" href="" target="_blank">
              Feedback
            </a>
          </li>
          <li className="hover:text-white">
            <a className="text-sm" href="">
              en_US
            </a>
          </li>
          <li className="hover:text-white">
            <a
              className="text-sm"
              href="https://www.leagueoflegends.com/en-us/news/tags/patch-notes/"
              target="_blank"
            >
              14.24.1
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
