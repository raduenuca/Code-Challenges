import System.Environment (getArgs)
import Data.Char

main = do
	[inpFile] <- getArgs
	input <- readFile inpFile
	-- print your output to stdout
	mapM_ putStrLn $ map capitalizeWords (lines input)

capitalizeWords :: String -> String
capitalizeWords = unwords . map capitalizeWord . words
  where capitalizeWord [] = []
        capitalizeWord (c:cs) = toUpper c : cs