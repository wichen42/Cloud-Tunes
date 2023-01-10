require 'aws-sdk-s3'
require 'faker'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# Grab links out of Amazon S3 folders
s3 = Aws::S3::Resource.new(region: 'us-east-1')

bucket_name = 'cloud-tunes-dev'
banner_folder = 'banner/'
profile_folder = 'profile/'

# Arrays to hold URL links
banner_urls = []
profile_urls = []

25.times do |i| 
  profile_urls << "https://cloud-tunes-dev.s3.amazonaws.com/profile/profile#{i+1}.jpg"
end

25.times do |i| 
  banner_urls << "https://cloud-tunes-dev.s3.amazonaws.com/banner/banner#{i+1}.jpg"
end


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
    User.create!(
      username: 'demolition', 
      password: 'password',
      created_at: Faker::Time.between(from: 2.days.ago, to: Time.now),
      updated_at: Faker::Time.between(from: 2.days.ago, to: Time.now),
      about: Faker::Lorem.paragraph,
      location: "#{Faker::Address.city}, #{Faker::Address.country}",
    )
  
    # More users
    # 10.times do 
    #   User.create!({
    #     username: Faker::Internet.unique.username(specifier: 3),
    #     password: 'password'
    #   }) 
    # end

    25.times do |i|
      user = User.create!(
        username: Faker::Internet.username,
        password: 'password',
        created_at: Faker::Time.between(from: 2.days.ago, to: Time.now),
        updated_at: Faker::Time.between(from: 2.days.ago, to: Time.now),
        about: Faker::Lorem.paragraph,
        location: "#{Faker::Address.city}, #{Faker::Address.country}",
      )
      
      profileUrl = s3.bucket('cloud-tunes-dev').object(`profile#{i+1}`)
    end
  
    puts "Done!"
  end