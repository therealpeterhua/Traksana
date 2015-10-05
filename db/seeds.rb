# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

def pull_lines(file)
  File.readlines(file).map { |line| line.gsub("\n", "") }
end

def attach_images(users, image_paths)
  users.each { |user| user[:avatar] = File.open(image_paths.sample) }
end

last_names = pull_lines(
  "#{Rails.root}/db/seed_helpers/last_names.txt"
)
male_first_names = pull_lines(
  "#{Rails.root}/db/seed_helpers/male_names.txt"
)
female_first_names = pull_lines(
  "#{Rails.root}/db/seed_helpers/female_names.txt"
)

female_users = [];
male_users = [];

40.times do
  male_users << { name: "#{male_first_names.sample} #{last_names.sample}" }
  female_users << { name: "#{female_first_names.sample} #{last_names.sample}" }
end

female_images = Dir.glob("#{Rails.root}/app/assets/images/demo_users_female/*")
male_images = Dir.glob("#{Rails.root}/app/assets/images/demo_users_male/*")

attach_images(male_users, male_images)
attach_images(female_users, female_images)

#attach image somewhere in here

users = female_users.concat(male_users)

users.each_with_index do |user, i|
  email_name = user[:name].delete(' ').downcase
  user[:email] = "#{email_name}@#{email_name}.com"
  user[:password] = SecureRandom.urlsafe_base64(16)

  begin
    User.new(user).save!
  #if user already taken, skip
  rescue ActiveRecord::RecordInvalid
  end
end

#if there's an issue seeding, we don't care -- just skip over (ie. for duplicates)
