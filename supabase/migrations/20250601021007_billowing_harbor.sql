/*
  # Update Partnership Partner ID

  1. Changes
    - Update the partner_id in the partnerships table to use the correct UUID
    - Ensure proper foreign key relationship

  2. Security
    - Maintains existing RLS policies
    - No changes to security model
*/

-- Update the partner_id in existing partnerships
UPDATE partnerships
SET partner_id = '8616d18e-717f-40b3-89f4-ef5adb4f95d1'
WHERE partner_id = '31f5e518-1f74-410c-ada1-7d6f2fb54001';