import Image from "next/image";
const AdminNavbar = () => {
  return (
    <div className="fixed top-0 flex flex-row justify-between">
      <div></div>
      <div>
        <Image
          src={"/Icons/profile.svg"}
          width={20}
          height={20}
          alt="Profile pic"
        />
        <h2>User</h2>
      </div>
    </div>
  );
};

export default AdminNavbar;
