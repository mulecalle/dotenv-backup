const targzFolder = 'backup';

// Create backup folder
await $`rm -rf ${targzFolder} && mkdir ${targzFolder}`;

// Create a list with the cloned repositories
const stdout = (await $`ls ../`).stdout.split('\n');
const folders = stdout.filter(item => item != '' );

await Promise.all(folders.map(async (repository) => {
  const stdout2 = (await($`cat ../${repository}/.env`)).stdout.split('\n');

  if (stdout2.length != 0) {
    await $`mkdir ${targzFolder}/${repository}`;
    await $`cp ../${repository}/.env ${targzFolder}/${repository}`;
  }
}));
