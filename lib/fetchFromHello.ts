const fetchFromHello = () =>
	fetch('/api/hello', { cache: 'no-store' }).then((res) => res.json());

export default fetchFromHello;
