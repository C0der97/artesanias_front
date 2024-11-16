<script lang="ts">
  import { colors } from '$lib/colors';

  import { onMount } from 'svelte';

  let productos: any[] = [];

  onMount(async () => {
    const response = await fetch('https://0d25f9c0yb.execute-api.us-east-1.amazonaws.com//api/productos');
    const data = await response.json();
    productos = data; // Asignamos los productos obtenidos a la variable reactiva
  });
</script>

<svelte:head>
  <title>Artesanías Tradicionales - Inicio</title>
</svelte:head>

<div class="bg-gradient-to-r from-[#2D5A27] to-[#A0522D] text-white py-16">
  <div class="container mx-auto px-4">
    <h2 class="text-4xl font-bold mb-4">Descubre el Arte de Boyacá y Cundinamarca</h2>
    <p class="text-xl mb-8">Explora nuestra colección de artesanías tradicionales hechas a mano</p>
    <a href="/buscar" class="bg-white text-[#2D5A27] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
      Explorar Catálogo
    </a>
  </div>
</div>

<div class="container mx-auto px-4 py-12">
  <h3 class="text-2xl font-bold mb-8 text-[#2D5A27]">Productos Destacados</h3>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each productos as producto}
      <a 
        href={`/productos/${producto.id}`} 
        class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group"
      >
        <img 
          src={producto.image_url} 
          alt={producto.name}
          class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-2">{producto.name}</h2>
          <p class="text-gray-600 mb-4">{producto.description}</p>
          <div class="flex justify-between items-center">
            <span class="text-xl font-bold" style="color: {producto.region === 'Boyacá' ? colors.boyaca.primary : colors.cundinamarca.primary}">
              ${producto.price.toLocaleString()}
            </span>
            <span class={producto.region === 'Boyacá' ? colors.boyaca.tag : colors.cundinamarca.tag}>
              {producto.region}
            </span>
          </div>
        </div>
      </a>
    {/each}
  </div>
</div>