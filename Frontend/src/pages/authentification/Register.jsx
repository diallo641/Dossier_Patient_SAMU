import { useState } from "react";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow w-96"
      >

        <h2 className="text-xl font-bold mb-4">
          Mot de passe oublié
        </h2>

        <input
          type="email"
          placeholder="Votre email"
          className="w-full border p-2 mb-3 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Envoyer
        </button>

      </form>

    </div>
  );
}