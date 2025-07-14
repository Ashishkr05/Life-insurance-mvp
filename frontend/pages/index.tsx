import { useState } from 'react';

// Define the shape of our form inputs
interface FormValues {
  age: number;
  income: number;
  dependents: number;
  risk: string;
}

// Define the shape of the response from backend
interface Recommendation {
  plan: string;
  reason: string;
}

export default function HomePage() {
  // Hold the form inputs
  const [formData, setFormData] = useState<FormValues>({
    age: 0,
    income: 0,
    dependents: 0,
    risk: 'medium',
  });

  // This will store the recommendation once we receive it
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

  // Handle any input changes
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ['age', 'income', 'dependents'].includes(name) ? Number(value) : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('https://life-insurance-mvp-backend.onrender.com/recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setRecommendation(data);
    } catch (err) {
      // Could add better error handling later
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Life Insurance Advisor</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow">
        <label className="block text-sm font-medium mb-1">Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleInput}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <label className="block text-sm font-medium mb-1">Income</label>
        <input
          type="number"
          name="income"
          value={formData.income}
          onChange={handleInput}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <label className="block text-sm font-medium mb-1">Number of Dependents</label>
        <input
          type="number"
          name="dependents"
          value={formData.dependents}
          onChange={handleInput}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <label className="block text-sm font-medium mb-1">Risk Tolerance</label>
        <select
          name="risk"
          value={formData.risk}
          onChange={handleInput}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Get Recommendation
        </button>
      </form>

      {recommendation && (
        <div className="mt-6 bg-white p-4 rounded shadow w-full max-w-md text-center">
          <h2 className="text-xl font-semibold">Recommended Plan</h2>
          <p className="mt-2 text-gray-800">{recommendation.plan}</p>
          <p className="mt-1 text-sm text-gray-500">{recommendation.reason}</p>
        </div>
      )}
    </div>
  );
}
