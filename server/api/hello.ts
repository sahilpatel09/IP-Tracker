import { exec } from 'child_process';

export default defineEventHandler(async (event) => {
  return new Promise((resolve, reject) => {
    exec('traceroute 8.8.8.8', (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }

      const results: any[] = [];
      const lines = stdout.split('\n');
      lines.forEach(line => {
        // Extract name/URL, IP addresses enclosed in parentheses, and the first time value
        const match = line.match(/(\S+) \((\d+\.\d+\.\d+\.\d+)\)  (\d+\.\d+\s+ms)/);
        if (match) {
          results.push({
            name: match[1],
            ip: match[2],
            time: match[3]
          });
        }
      });

      resolve({ data: results });
    });
  });
});


// import { exec } from 'child_process';

// export default defineEventHandler(async (event) => {
//   const results: any = [];
//   const data = exec('traceroute 8.8.8.8', (error, stdout, stderr) => {

//     const lines = stdout.split('\n');
//     lines.forEach(line => {
//       // Extract name/URL, IP addresses enclosed in parentheses, and the first time value
//       const match = line.match(/(\S+) \((\d+\.\d+\.\d+\.\d+)\)  (\d+\.\d+\s+ms)/);

//       if (match) {
//         results.push({
//           name: match[1],
//           ip: match[2],
//           time: match[3]
//         });
//       }
//     });


//   });
//   return { data: data }
// })



