export default function page({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>
      <h2 className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        {params.id}
      </h2>
    </div>
  );
}
