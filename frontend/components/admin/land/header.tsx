const Header = ({ title }: { title: string }) => {
  return (
    <header className="bg-white p-5 m-2 rounded">
      <h1 className="text-4xl  font-bold ">{title}</h1>
    </header>
  );
};

export default Header;
