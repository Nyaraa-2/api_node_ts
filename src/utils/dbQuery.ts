const getById: string = 'SELECT id, name, type FROM public.pet WHERE id = $1'
const updateById: string = 'UPDATE public.pet SET name=$1, type=$2 WHERE id= $3 RETURNING *'
const create: string = 'INSERT INTO public.pet(name, type) VALUES ($1, $2) RETURNING *'
const deleteById: string = 'DELETE FROM public.pet WHERE id = $1'
const getAll: string = 'SELECT id, name, type FROM public.pet'

export default { getById, updateById, create, deleteById, getAll }