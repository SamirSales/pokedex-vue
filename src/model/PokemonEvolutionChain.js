export default class PokemonEvolutionChain {
    constructor(evolutionChainOutput) {
        console.log('evolutionChainOutput', evolutionChainOutput);
        this.evolutionChainOutput = evolutionChainOutput;

        console.log('getTreeData', this.getTreeData());
    }

    getTreeData() {
        return [getTreeDataRecursively(this.evolutionChainOutput.chain)];
    }

    hasEvolution() {
        return this.evolutionChainOutput.chain.evolves_to.length > 0;
    }
}

const getTreeDataRecursively = (data) => {
    const name = data.species.name;
    const id = parseInt(data.species.url.replace('https://pokeapi.co/api/v2/pokemon-species/', '').replace('/', ''));

    return {
        id,
        name: name.charAt(0).toUpperCase() + name.slice(1),
        children: data.evolves_to.map((e) => getTreeDataRecursively(e))
    };
};
