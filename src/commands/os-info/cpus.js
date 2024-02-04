import { availableParallelism, cpus as nodeCPUS } from 'os';

export const cpus = () => {
  const cpuData = nodeCPUS();
  const coreCount = availableParallelism();
  const cpuInfoArray = [];

  console.log(`Number of cores: ${coreCount}`);
  cpuData.forEach((core) => {
    cpuInfoArray.push({ Model: core.model, Speed: `${(core.speed / 1000).toFixed(2)} GHz` });
  });

  console.table(cpuInfoArray, ['Model', 'Speed']);
};
