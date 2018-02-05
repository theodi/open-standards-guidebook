// Log a vinyl steam to stdout for debugging purposes
module.exports = (chunk) => {
  const contents = chunk.contents.toString().trim();
  const bufLength = process.stdout.columns;
  const hr = '\n\n' + Array(bufLength).join("_") + '\n\n'
  if (contents.length > 1) {
      process.stdout.write(chunk.path + '\n' + contents + '\n');
      process.stdout.write(chunk.path + hr);
  }
};
