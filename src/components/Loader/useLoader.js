import { useContext } from "react";
import { useEffect } from "react";
import { AppContext } from "../../AppContext";

const useLoader = () => {
	const { isLoading, setIsLoading } = useContext(AppContext);

	useEffect(() => {
		const handleLoad = () => {
			setTimeout(() => {
				setIsLoading(false);
			}, 1000);
		};
		if (document.readyState === "complete") {
			handleLoad();
		} else {
			document.addEventListener("readystatechange", handleLoad);
		}

		return () => {
			document.removeEventListener("readystatechange", handleLoad);
		};
	}, []);
	return isLoading;
};
export default useLoader;
