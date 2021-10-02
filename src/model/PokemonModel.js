export default class PokemonModel {
    constructor(dataResponse) {
        this.id = dataResponse.id;
        this.imageURL = dataResponse.sprites.front_default;
        this.name = dataResponse.name.charAt(0).toUpperCase() + dataResponse.name.slice(1);
        this.types = dataResponse.types;

        this.heightInMeters = dataResponse.height / 10;
        this.weightInKg = dataResponse.weight / 10;
        this.baseExperience = dataResponse.base_experience;

        this.gameNames = dataResponse.game_indices.map((gi) => gi.version.name);
        this.points = dataResponse.stats.map((st) => {
            return { name: st.stat.name, value: st.base_stat };
        });
    }
}
