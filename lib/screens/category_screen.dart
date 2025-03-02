import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class CategorySection extends StatelessWidget {
  const CategorySection({super.key});

  @override
  Widget build(BuildContext context) {
    // List of categories with their respective icons and names
    final List<Map<String, dynamic>> categories = [
      {
        'icon': FontAwesomeIcons.mobileScreen,
        'name': 'Electronics',
        'color': const Color(0xFF5AC8FA),
      },
      {
        'icon': FontAwesomeIcons.shirt,
        'name': 'Fashion',
        'color': const Color(0xFFFF9500),
      },
      {
        'icon': FontAwesomeIcons.kitchenSet,
        'name': 'Home',
        'color': const Color(0xFF34C759),
      },
      {
        'icon': FontAwesomeIcons.gamepad,
        'name': 'Gaming',
        'color': const Color(0xFFFF2D55),
      },
      {
        'icon': FontAwesomeIcons.gift,
        'name': 'Deals',
        'color': const Color(0xFF007AFF),
      },
      {
        'icon': FontAwesomeIcons.ellipsis,
        'name': 'More',
        'color': const Color(0xFF8E8E93),
      },
    ];

    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 0, 16, 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Title Row with "View All" option
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Categories',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                ),
              ),
              TextButton(
                onPressed: () {
                  // Navigate to all categories
                },
                child: const Text(
                  'View All',
                  style: TextStyle(
                    color: Color(0xFF007AFF),
                    fontSize: 13,
                  ),
                ),
              ),
            ],
          ),

          // Categories row
          SizedBox(
            height: 100,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: categories.length,
              itemBuilder: (context, index) {
                final category = categories[index];
                return Padding(
                  padding: EdgeInsets.only(
                    right: 12,
                    left: index == 0 ? 2 : 0,
                  ),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      // Category icon with container
                      Container(
                        width: 64,
                        height: 64,
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(20),
                          boxShadow: [
                            BoxShadow(
                              color: category['color'].withOpacity(0.15),
                              blurRadius: 10,
                              spreadRadius: 0,
                              offset: const Offset(0, 4),
                            ),
                          ],
                        ),
                        child: Center(
                          child: FaIcon(
                            category['icon'],
                            color: category['color'],
                            size: 20,
                          ),
                        ),
                      ),
                      const SizedBox(height: 8),
                      // Category name
                      Text(
                        category['name'],
                        style: const TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
