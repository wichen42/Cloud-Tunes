require 'faker'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

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
      puts "creating track #{i+1} for demouser"
      demouserTrack = Track.create!(
        title: Faker::Music::RockBand.song,
        username: "demolition",
        genre: Faker::Music.genre,
        description: Faker::Lorem.paragraphs(number: 3),
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
        title: Faker::Music::RockBand.song,
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
      biggieTrack.image.attach(io: biggieTrackImage, filename: "track-cover/cover#{i+11}.jpg")

    end

    puts "Creating other users"
    25.times do |i|
      user = User.create!(
        username: Faker::Internet.username(specifier: 3..30),
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

      puts "creating tracks for user #{i+1}"

      rand(3...7).times do |i|
        userTrack = Track.create!(
          title: Faker::Music::RockBand.song,
          username: user.username,
          genre: Faker::Music.genre,
          description: Faker::Lorem.paragraph(sentence_count: 5),
          created_at: Faker::Time.between(from: 2.days.ago, to: Time.now),
          updated_at: Faker::Time.between(from: 2.days.ago, to: Time.now),
          user_id: user.id,
        )
        randomNum = rand(1...33);
        puts "creating track #{i+1}"

        userTrackFile = URI.open("https://cloud-tunes-dev.s3.amazonaws.com/tracks/track#{randomNum}.mp3")
        userTrack.track.attach(io: userTrackFile, filename: "track#{randomNum}.mp3")
    
        userTrackImage = URI.open("https://cloud-tunes-dev.s3.amazonaws.com/track-cover/cover#{rand(1...33)}.jpg")
        userTrack.image.attach(io: userTrackImage, filename: "cover#{rand(1...33)}.jpg")

      end

    end
    
    puts "creating comments"

    Track.all.each do |track|
      puts "creating comments for track #{track.id}"
      rand(3...6).times do |i|
        puts "creating comment #{i+1}"
        Comment.create!(
          user_id: rand(1...27),
          track_id: track.id,
          body: Faker::Lorem.sentence(word_count: 5)
        )
      end
    end
       
    
    puts "creating likes for demouser"

    15.times do |i| 
      puts "create like #{i+1} for demouser"
      Like.create!(
        user_id: demo.id,
        track_id: i+1,
      )
    end

    puts "creating follows"

    puts "Done!"
    # More users
    # 10.times do 
    #   User.create!({
    #     username: Faker::Internet.unique.username(specifier: 3),
    #     password: 'password'
    #   }) 
    # end
  end