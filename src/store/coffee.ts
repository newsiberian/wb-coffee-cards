import { writable } from 'svelte/store';

export type CoffeeKind = {
  id: number;
  uid: number;
  blend_name: string;
  origin: string;
  variety: string;
  notes: string;
  intensifier: string;
};

function fetchCoffeeKind() {
  return fetch('https://random-data-api.com/api/coffee/random_coffee').then<CoffeeKind>(
    (response) => response.json()
  );
}

function createCoffeeStore() {
  const { subscribe, update } = writable<
    (Omit<CoffeeKind, 'uid' | 'notes'> & { notesList: string[] })[]
  >([]);

  return {
    subscribe,
    getCoffeeKind: async () =>
      fetchCoffeeKind()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .then(({ uid, notes, ...newCoffeeKind }) =>
          update((coffeeKinds) => {
            // since API generates random data, it is possible to receive duplicates
            if (coffeeKinds.findIndex((coffeeKind) => coffeeKind.id === newCoffeeKind.id) === -1) {
              return [
                ...coffeeKinds,
                {
                  ...newCoffeeKind,
                  notesList: notes.split(', ')
                }
              ];
            } else {
              // toast should be here instead
              alert('Server returns duplicate. Ignoring...');
              console.error('Server returns duplicate. Ignoring...');
            }
            return coffeeKinds;
          })
        )
        .catch((error) => console.error(error))
  };
}

export const coffeeStore = createCoffeeStore();

export const loadingStore = writable(false);
