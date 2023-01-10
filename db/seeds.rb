require 'faker'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


# s3.list_objects(bucket: bucket_name, prefix: banner_folder).contents.each do |object|
#   banner_urls << "https://s3.#{s3.config.region}.amazonaws.com/#{bucket_name}/#{object.key}"
# end

# s3.list_objects(bucket: bucket_name, prefix: profile_folder).contents.each do |object|
#   profile_urls << "https://s3.#{s3.config.region}.amazonaws.com/#{bucket_name}/#{object.key}"
# end

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:

    puts "Creating demouser"
    demo = User.create!(
      username: 'demolition', 
      password: 'password',
      created_at: Faker::Time.between(from: 2.days.ago, to: Time.now),
      updated_at: Faker::Time.between(from: 2.days.ago, to: Time.now),
      about: Faker::Lorem.paragraph,
      location: "#{Faker::Address.city}, #{Faker::Address.country}",
    )
    puts "Attaching demo user image and banner"
    demoImage = URI.open('https://cloud-tunes-dev.s3.amazonaws.com/cat.jpg')
    demo.image.attach(io: demoImage, filename: 'cat.jpg')

    demoBanner = URI.open('https://cloud-tunes-dev.s3.amazonaws.com/sky-tape.jpg')
    demo.banner.attach(io: demoBanner, filename: 'sky-tape.jpg')

    puts "Creating tracks for demouser"

    demouserTrack1 = Track.create!(
      title: Faker::Music.album,
      username: "demouser",
      genre: Faker::Music.genre,
      description: Faker::Lorem.paragraph
      created_at: Faker::Time.between(from: 2.days.ago, to: Time.now),
      updated_at: Faker::Time.between(from: 2.days.ago, to: Time.now),
      user_id: demouser.id
    )

    demoTrack1 = URI.open('https://cloud-tunes-dev.s3.amazonaws.com/tracks/track1.mp3')
    demouserTrack1.track.attach(io: demoTrack1, filename: 'track1.mp3')
    
    demoTrack2 = URI.open('https://cloud-tunes-dev.s3.amazonaws.com/tracks/track2.mp3'
    demoTrack3 = URI.open('https://cloud-tunes-dev.s3.amazonaws.com/tracks/track3.mp3'
    demoTrack4 = URI.open('https://cloud-tunes-dev.s3.amazonaws.com/tracks/track4.mp3'
    demoTrack5 = URI.open('https://cloud-tunes-dev.s3.amazonaws.com/tracks/track5.mp3'

    
    

  

    puts "Creating Biggie"
    biggie = User.create!(
      username: 'biggie',
      password: 'password',
      created_at: Faker::Time.between(from: 2.days.ago, to: Time.now),
      updated_at: Faker::Time.between(from: 2.days.ago, to: Time.now),
      about: Faker::Lorem.paragraph,
      location: "#{Faker::Address.city}, #{Faker::Address.country}",
    )

    biggieProfile = URI.open('https://cloud-tunes-dev.s3.amazonaws.com/profile16.jpg')
    user.image.attach(io: profile, filename: 'profile16.jpg')

    biggieBanner = URI.open('https://cloud-tunes-dev.s3.amazonaws.com/banner12.jpg')
    user.banner.attach(io: banner, filename: 'banner12.jpg')
    # More users
    # 10.times do 
    #   User.create!({
    #     username: Faker::Internet.unique.username(specifier: 3),
    #     password: 'password'
    #   }) 
    # end

    puts "Creating other users"
    25.times do |i|
      user = User.create!(
        username: Faker::Internet.username,
        password: 'password',
        created_at: Faker::Time.between(from: 2.days.ago, to: Time.now),
        updated_at: Faker::Time.between(from: 2.days.ago, to: Time.now),
        about: Faker::Lorem.paragraph,
        location: "#{Faker::Address.city}, #{Faker::Address.country}",
      )
      puts "creating and attaching profile image for user #{i+1}"
      profile = URI.open("https://cloud-tunes-dev.s3.amazonaws.com/profile#{i+1}.jpg")
      user.image.attach(io: profile, filename: "profile#{i+1}.jpg")

      puts "creating and attaching banner image for user #{i+1}"
      banner = URI.open("https://cloud-tunes-dev.s3.amazonaws.com/banner#{i+1}.jpg")
      user.banner.attach(io: banner, filename: "banner#{i+1}.jpg")

    end
  
    puts "Done!"
  end