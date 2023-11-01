import { get_auth_uri } from "../assets/constants";

export const Login = () => {
  return (
    <div className="flex h-[100vh] justify-center items-center">
      <a href={get_auth_uri}>
        <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-3 px-4 rounded">
          LOGIN TO ABDIFY
        </button>
      </a>
    </div>
  );
};
