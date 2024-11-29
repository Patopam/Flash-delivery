const supabase = require("../services/supabase");

const createPlayers = async (userData) => {
    console.log('Datos recibidos en createPlayers:', userData); // Debug
    
    try {
        const { data, error } = await supabase
            .from("Players")
            .insert([userData])
            .select();

        if (error) {
            console.error('Error de Supabase:', error); // Debug
            throw error;
        }

        console.log('Respuesta de Supabase:', data); // Debug
        return data;
    } catch (error) {
        console.error('Error en createPlayers:', error); // Debug
        throw error;
    }
};
// https://supabase.com/docs/reference/javascript/select
const getAllPlayers = async () => {
  const { data, error } = await supabase.from("Players").select();
  if (error) {
    console.error(error);
    return error;
  }
  return data;
};

const getPlayersById = async (id) => {
  const { data, error } = await supabase.from("Players").select().eq("id", id);
  if (error) {
    console.error(error);
    return error;
  }
  return data;
};

// https://supabase.com/docs/reference/javascript/update
const updatePlayers = async (id, object) => {
  const { data, error } = await supabase
    .from("Players")
    .update(object)
    .eq("id", id)
    .select();

  return data;
};

// https://supabase.com/docs/reference/javascript/delete
const deletePlayers = async (id) => {
  const { error } = await supabase.from("Players").delete().eq("id", id);
  if (error) {
    console.error(error);
    return error;
  }
};

module.exports = {
  createPlayers,
  getAllPlayers,
  getPlayersById,
  deletePlayers,
  updatePlayers,
};