export default function UploadBox({ handleChange, preview }) {

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) handleChange(file);
  };

  return (
    <div className="border-2 border-dashed p-6 rounded-xl text-center">

      <input type="file" onChange={onFileChange} />

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="mt-4 rounded-lg"
        />
      )}

    </div>
  );
}