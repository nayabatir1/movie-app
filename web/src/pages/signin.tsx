import { Montserrat } from "next/font/google";
import { useForm, SubmitHandler } from "react-hook-form";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

type SignInForm = {
  email: string;
  password: string;
  remember: boolean;
};

export default function Signin() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignInForm>();

  const onSubmit: SubmitHandler<SignInForm> = (data) => console.log(data);

  return (
    <section
      className={`${montserrat.className} p-20 h-screen flex justify-center items-center`}
    >
      <div className="md:w-[300px] w-full">
        <h1 className="text-center mb-5">Sign in</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email", { required: true })}
            placeholder="Email"
            className="bg-dark-slate-gray w-full p-2 rounded-lg mb-5"
          />

          <input
            {...register("password", { required: true })}
            placeholder="Password"
            className="bg-dark-slate-gray w-full p-2 rounded-lg mb-5 "
          />

          <div className="flex justify-center">
            <input {...register("remember")} type="checkbox" />
            <span className="body-small ml-2">Remember me</span>
          </div>

          <button
            type="submit"
            className="bg-green w-full mt-5 py-4 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
