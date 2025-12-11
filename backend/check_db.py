"""
Simple script to check and display contact submissions from the database
Run this script to verify contact data is being stored correctly.
"""
import sqlite3
import os
from datetime import datetime

def check_contacts():
    db_path = "project_pulse.db"
    
    if not os.path.exists(db_path):
        print(f"❌ Database file '{db_path}' not found!")
        print("   Make sure you've run the FastAPI server at least once.")
        return
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Check if contacts table exists
        cursor.execute("""
            SELECT name FROM sqlite_master 
            WHERE type='table' AND name='contacts'
        """)
        
        if not cursor.fetchone():
            print("❌ 'contacts' table not found in database!")
            print("   Make sure the Contact model is imported in main.py")
            conn.close()
            return
        
        # Get all contacts
        cursor.execute("""
            SELECT id, name, email, message, created_at 
            FROM contacts 
            ORDER BY created_at DESC
        """)
        
        contacts = cursor.fetchall()
        
        if not contacts:
            print("📭 No contact submissions found in database.")
            print("   Submit a contact form to add data.")
        else:
            print(f"\n✅ Found {len(contacts)} contact submission(s) in database:\n")
            print("=" * 80)
            
            for contact in contacts:
                contact_id, name, email, message, created_at = contact
                print(f"\n📧 Contact ID: {contact_id}")
                print(f"   Name: {name}")
                print(f"   Email: {email}")
                print(f"   Message: {message[:100]}{'...' if len(message) > 100 else ''}")
                print(f"   Created: {created_at}")
                print("-" * 80)
        
        # Get table info
        cursor.execute("PRAGMA table_info(contacts)")
        columns = cursor.fetchall()
        print(f"\n📋 Table Structure:")
        for col in columns:
            print(f"   - {col[1]} ({col[2]})")
        
        conn.close()
        print("\n✅ Database check complete!")
        
    except sqlite3.Error as e:
        print(f"❌ Database error: {e}")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    print("🔍 Checking Project Pulse Database...\n")
    check_contacts()

