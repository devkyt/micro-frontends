import { atom, useAtom } from "jotai";

const countAtom = atom(0);

const useCount = () => useAtom(countAtom)

export { useCount, countAtom };