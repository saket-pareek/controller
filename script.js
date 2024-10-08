const inputEl = document.querySelector("#cmp-search__input");
let controller;

const showSuggestions = async () => {
	try {
		console.log("hello");
		if (controller) controller.abort();
		controller = new AbortController();
		const inputVal = inputEl.value;
		if (inputVal.length <= 2) return;

		const res = await fetch(
			`https://dummyjson.com/users/search?q=${inputVal}`,
			{ signal: controller.signal }
		);
		if (!res.ok) throw new Error(`${res.status} Something went wrong`);
		const data = await res.json();
		console.log(data);
	} catch (err) {
		if (err.name !== 'AbortError') console.warn(err);
	}
};

inputEl.addEventListener("input", showSuggestions);
