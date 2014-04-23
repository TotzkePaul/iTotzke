using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using itotzke.Database;
using MarkovChainTextBox;

namespace MarkovChainTextBox
{
    /**
     * MARKOV CHAIN GENERATOR IN .NET was created by Noldorin
     * 
     * Source: http://blog.noldorin.com/2010/02/markov-chain-generator-in-net/
     */

    // Represents a Markov chain of arbitrary length.
    [DebuggerDisplay("{this.nodes.Count} nodes")]
    public class MarkovChain<T>
    {
        private static readonly IEqualityComparer<T> comparer = EqualityComparer<T>.Default;

        private readonly Random random = new Random();

        private List<MarkovChainNode<T>> nodes;
        private ReadOnlyCollection<MarkovChainNode<T>> nodesReadOnly;

        public MarkovChain()
        {
            this.nodes = new List<MarkovChainNode<T>>();
            this.nodesReadOnly = new ReadOnlyCollection<MarkovChainNode<T>>(this.nodes);
        }

        public ReadOnlyCollection<MarkovChainNode<T>> Nodes
        {
            get { return nodesReadOnly; }
        }

        public IEnumerable<T> GenerateSequence()
        {
            var curNode = GetNode(default(T));
            int i = 0;
            while (true)
            {
                i++;
                if (curNode.Links.Count == 0)
                    break;
                curNode = curNode.Links[random.Next(curNode.Links.Count)];
                if (curNode.Value == null || i> 30)
                    break;
                yield return curNode.Value;
            }
        }

        public void Train(T fromValue, T toValue)
        {
            var fromNode = GetNode(fromValue);
            var toNode = GetNode(toValue);
            fromNode.AddLink(toNode);
        }

        private MarkovChainNode<T> GetNode(T value)
        {
            var node = this.nodes.SingleOrDefault(n => comparer.Equals(n.Value, value));
            if (node == null)
            {
                node = new MarkovChainNode<T>(value);
                this.nodes.Add(node);
            }
            return node;
        }
    }
    // Represents a node within a Markov chain.
    [DebuggerDisplay("Value: {this.value == null ? \"(null)\" : this.value.ToString()}, {this.links.Count} links")]
    public class MarkovChainNode<T>
    {
        private T value;
        private List<MarkovChainNode<T>> links;
        private ReadOnlyCollection<MarkovChainNode<T>> linksReadOnly;

        public MarkovChainNode(T value)
            : this()
        {
            this.value = value;
        }

        public MarkovChainNode()
        {
            this.links = new List<MarkovChainNode<T>>();
            this.linksReadOnly = new ReadOnlyCollection<MarkovChainNode<T>>(this.links);
        }

        public T Value
        {
            get { return this.value; }
            set { this.value = value; }
        }

        public ReadOnlyCollection<MarkovChainNode<T>> Links
        {
            get { return linksReadOnly; }
        }

        public void AddLink(MarkovChainNode<T> toNode)
        {
            this.links.Add(toNode);
        }
    }
}
namespace itotzke.Utilites
{
    public class Carly
    {
        public static MarkovChain<string> myMarkovChain = null; 
        public static string MarkovGenerator(string input)
        {
            if (myMarkovChain == null)
            {

                StringBuilder sb = new StringBuilder();
                using (StreamReader sr = new StreamReader(HttpRuntime.AppDomainAppPath + "Database/MarkovDB.txt"))
                {
                    String line;
                    // Read and display lines from the file until the end of 
                    // the file is reached.
                    while ((line = sr.ReadLine()) != null)
                    {
                        sb.AppendLine(line);
                    }
                }
                var mc = new MarkovChain<string>();

                string sampleText = sb.ToString().ToLower();
                string[] sentences = sampleText.Split(new char[] { '?', '.', '!', ';' }, StringSplitOptions.RemoveEmptyEntries);
                foreach (string sentence in sentences)
                {

                    string[] words = sentence.Split(new char[] {' '}, StringSplitOptions.RemoveEmptyEntries);
                    if (words.Length < 2)
                    {
                        continue;
                    }
                    for (int i = 0; i < words.Length - 1; i++)
                    {
                        mc.Train(words[i], words[i + 1]);
                    }
                    mc.Train(default(string), words[0]);
                    mc.Train(words[words.Length - 1], ".");
                }
                myMarkovChain = mc;
            }

            IEnumerable<string> t = myMarkovChain.GenerateSequence();
            string retVal = String.Join(" ", t.ToArray());
            return retVal;
        }


        public static string response(string input)
        {
            Random rnd = new Random();
            string[] strArr = new string[] {"It is certain",
                                            "It is decidedly so",
                                            "Without a doubt",
                                            "Yes definitely",
                                            "You may rely on it",
                                            "As I see it yes",
                                            "Most likely",
                                            "Outlook good",
                                            "Yes",
                                            "Signs point to yes",
                                            "Reply hazy try again",
                                            "Ask again later",
                                            "Better not tell you now",
                                            "Cannot predict now",
                                            "Concentrate and ask again",
                                            "Don't count on it",
                                            "My reply is no" };
            try
            {
                return MarkovGenerator(input);//strArr[rnd.Next(0, strArr.Length)];
            }
            catch (Exception ex)
            {
                return ex.Message + " :: " + ex.ToString();

            }
            
        }

    }
}