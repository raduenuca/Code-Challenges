using System;
using System.IO;
using System.Linq;

namespace Challenges
{
    class CapitalizeWords
    {
        static void Main(string[] args)
        {
            using (var reader = File.OpenText(args[0]))
                while (!reader.EndOfStream)
                {
                    var line = reader.ReadLine();
                    if (null == line)
                        continue;

                    Console.WriteLine(string.Join(" ", line.Split(' ').Select(w => w.Substring(0, 1).ToUpper() + w.Substring(1, w.Length - 1))));
                }
        }
    }
}