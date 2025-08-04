import Fuse from "fuse.js";
import { useCallback, useMemo, useState } from "react";
import { useDebounce } from "./useDebounce";

export const useFuse = <T>(list: T[], options: object) => {
	// defining our query state in there directly
	const [query, updateQuery] = useState("");
	const debouncedQuery = useDebounce(query, 400);

	// let's memoize the fuse instance for performances
	const fuse = useMemo(() => new Fuse(list, options), [list, options]);

	// memoize results whenever the query or options change
	const hits = useMemo(() => {
		const results = fuse.search(debouncedQuery.trim(), {
			limit: 10,
		});

		return results.map((result) => {
			const highlights: string[] = [];
			result.matches?.forEach((match) => {
				if (match.key === "sections.content") {
					const matchesLengths = match.indices.map(
						(pair) => pair[1] - pair[0],
					);
					const maxIndex = matchesLengths.indexOf(
						Math.max(...matchesLengths),
					);
					let highlightText: string | undefined = undefined;
					if (typeof match.value === "string") {
						highlightText =
							"..." +
							match.value
								.substring(
									Math.max(
										match.indices[maxIndex][0] - 10,
										0,
									),
									match.indices[maxIndex][1] + 10,
								)
								.replace(/\n/g, " ") +
							"...";
						highlights.push(highlightText);
					}
				}
			});

			return {
				...result.item,
				highlights,
			};
		});
	}, [fuse, debouncedQuery]);

	// pass a handling helper to speed up implementation
	const onSearch = useCallback(
		(value: string) => updateQuery(value),
		[updateQuery],
	);

	return {
		hits,
		onSearch,
		query,
		updateQuery,
	};
};
