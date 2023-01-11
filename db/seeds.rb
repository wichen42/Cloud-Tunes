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
    Track.destroy_all
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

    10.times do |i| 
      demouserTrack = Track.create!(
        title: Faker::Music.album,
        username: "demolition",
        genre: Faker::Music.genre,
        description: Faker::Lorem.paragraph(number: 3),
        created_at: Faker::Time.between(from: 2.days.ago, to: Time.now),
        updated_at: Faker::Time.between(from: 2.days.ago, to: Time.now),
        user_id: demo.id,
      )

      demoTrack = URI.open("https://cloud-tunes-dev.s3.amazonaws.com/tracks/track#{i+1}.mp3")
      demouserTrack.track.attach(io: demoTrack, filename: "track#{i+1}.mp3")
  
      demoTrack1Image = URI.open("https://cloud-tunes-dev.s3.amazonaws.com/track-cover/cover#{i+1}.jpg")
      demouserTrack.image.attach(io: demoTrack1Image, filename: "cover#{i+1}.jpg")
    end

  
    puts "Creating Biggie"
    biggie = User.create!(
      username: 'biggie',
      password: 'password',
      created_at: Faker::Time.between(from: 2.days.ago, to: Time.now),
      updated_at: Faker::Time.between(from: 2.days.ago, to: Time.now),
      about: Faker::Lorem.paragraph(sentence_count: 5),
      location: "#{Faker::Address.city}, #{Faker::Address.country}",
    )

    biggieProfile = URI.open('https://cloud-tunes-dev.s3.amazonaws.com/profile/profile18.jpg')
    biggie.image.attach(io: biggieProfile, filename: 'profile18.jpg')

    biggieBanner = URI.open('https://cloud-tunes-dev.s3.amazonaws.com/banner/banner12.jpg')
    biggie.banner.attach(io: biggieBanner, filename: 'banner12.jpg')

    puts "creating tracks for biggie"

    10.times do |i|
      biggieTrack = Track.create!(
        title: Faker::Music.album,
        username: "biggie",
        genre: Faker::Music.genre,
        description: Faker::Lorem.paragraph(sentence_count: 5),
        created_at: Faker::Time.between(from: 2.days.ago, to: Time.now),
        updated_at: Faker::Time.between(from: 2.days.ago, to: Time.now),
        user_id: biggie.id,
      )
      puts "creating biggie track #{i+1}"
      
      uri = "https://cloud-tunes-dev.s3.amazonaws.com/tracks/track#{i+11}.mp3"
      
      biggieTrackFile = URI.open(uri)
      biggieTrack.track.attach(io: biggieTrackFile, filename: "tracks/track#{i+11}.mp3")
      
      biggieTrackImage = URI.open("https://cloud-tunes-dev.s3.amazonaws.com/track-cover/cover#{i+1}.jpg")
      biggieTrack.image.attach(io: biggieTrackImage, filename: "track-cover/cover#{i+1}.jpg")

    end

    puts "Creating other users"
    25.times do |i|
      user = User.create!(
        username: Faker::Internet.username,
        password: 'password',
        created_at: Faker::Time.between(from: 2.days.ago, to: Time.now),
        updated_at: Faker::Time.between(from: 2.days.ago, to: Time.now),
        about: Faker::Lorem.paragraph(sentence_count: 5),
        location: "#{Faker::Address.city}, #{Faker::Address.country}",
      )
      puts "creating and attaching profile and banner image for user #{i+1}"
      profile = URI.open("https://cloud-tunes-dev.s3.amazonaws.com/profile/profile#{i+1}.jpg")
      user.image.attach(io: profile, filename: "profile#{i+1}.jpg")

      banner = URI.open("https://cloud-tunes-dev.s3.amazonaws.com/banner/banner#{i+1}.jpg")
      user.banner.attach(io: banner, filename: "banner#{i+1}.jpg")

    end
  
    puts "Done!"
    # More users
    # 10.times do 
    #   User.create!({
    #     username: Faker::Internet.unique.username(specifier: 3),
    #     password: 'password'
    #   }) 
    # end
  end