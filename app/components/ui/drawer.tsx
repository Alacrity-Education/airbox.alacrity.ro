export default function Drawer({ children }: { children: React.ReactNode }) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {children}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side z-[999]">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="menu bg-neutral  text-neutral-content min-h-full w-80 p-4 shadow-xl gap-4">
          <h1 className="text-3xl text-center font-semibold">AirBox</h1>
          <Search />
          <div className="flex flex-col gap-3">
            <Card name="Bucuresti/Lazar-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

const Card = ({ name }: { name: String }) => {
  return (
    <div className="w-full h-32 bg-base-100 text-base-content p-2 rounded-lg text-xl flex flex-col ">
      <div className="flex flex-row justify-between items-center font-semibold">
        {name}{" "}
        <div className="h-3 w-3 animate-pulse rounded-full bg-success"></div>
      </div>
      <div className="flex flex-row gap-2">
        <div className="badge badge-success font-semibold">Clean</div>
        <div className="badge badge-primary font-semibold">AirBox V2</div>
        <div className="badge badge-neutral font-semibold">2 modules</div>
      </div>

      <div className="grow"></div>
      <div className="text-lg ">
        Uptime: <span className=" font-semibold">22 days</span>
      </div>
    </div>
  );
};

const Search = () => {
  return (
    <>
      <label className="input bg-base-100 text-base-content">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          className="grow"
          placeholder="Search city or Airbox ID"
        />
      </label>
    </>
  );
};
