
# =========== Set up users hash array ================

def pull_lines(file)
  File.readlines(file).map { |line| line.gsub("\n", "") }
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

50.times do
  male_users << { name: "#{male_first_names.sample} #{last_names.sample}" }
  female_users << { name: "#{female_first_names.sample} #{last_names.sample}" }
end

# =========== Add images to user attribute hashes =============

def attach_images(users, image_paths)
  users.each { |user| user[:avatar] = File.open(image_paths.sample) }
end

female_images = Dir.glob("#{Rails.root}/app/assets/images/demo_users_female/*")
male_images = Dir.glob("#{Rails.root}/app/assets/images/demo_users_male/*")

attach_images(male_users, male_images)
attach_images(female_users, female_images)

# ============ Create users in database ===============

users = female_users.concat(male_users)

users.shuffle.each_with_index do |user, i|
  email_name = user[:name].delete(' ').downcase
  user[:email] = "#{email_name}@#{email_name}.com"
  user[:password] = SecureRandom.urlsafe_base64(16)

  begin
    User.new(user).save!
  rescue ActiveRecord::RecordInvalid
    #if email already taken by another random seed, keep going
  end
end
