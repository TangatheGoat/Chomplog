<template>
  <div class="min-h-screen flex flex-col">
    
   
    <section
      class="relative w-full h-[400px] bg-cover bg-center flex flex-col justify-center items-center text-center text-green-900"
      style="background-image: url(@/assets/food.jpeg);"
    >
      <blockquote class="bg-white bg-opacity-70 p-4 rounded-md shadow-md max-w-lg">
        <p class="font-semibold">
          "Calorie maintenance isn’t about restriction—it’s about balance.
          Fuel your body with intention, move with purpose, and let your energy shine."
        </p>
      </blockquote>
    </section>
   
    <main class="flex-grow px-6 py-10 bg-green-100 text-center">
     
      <section class="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-md">
        <h2 class="text-2xl font-semibold text-green-600">About ChompLog</h2>
        <p class="text-green-500 mt-2">
          ChompLog is the go-to platform for individuals seeking to monitor and manage their calorie consumption effectively.
          Our user-friendly interface and detailed explanations make it easy for anyone to start their calorie tracking journey.
        </p>
        <p class="text-green-500 mt-4">
          We are dedicated solely to helping individuals achieve their health and fitness goals through calorie tracking.
          With a focus on simplicity and accuracy, ChompLog ensures that users have the tools they need to make informed choices about their nutrition.
        </p>
      </section>

      <section class="mt-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="#" class="block bg-white shadow-md p-4 rounded-md text-green-600 hover:text-green-800 transition">
            Get more information about weight management <span class="font-bold underline">here</span>
          </a>
          <a href="#" class="block bg-white shadow-md p-4 rounded-md text-green-600 hover:text-green-800 transition">
            Learn about a balanced diet <span class="font-bold underline">here</span>
          </a>
          <a href="#" class="block bg-white shadow-md p-4 rounded-md text-green-600 hover:text-green-800 transition">
            Learn about calories <span class="font-bold underline">here</span>
          </a>
        </div>
      </section>
    </main>


  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>