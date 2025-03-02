import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class CustomBottomNav extends StatefulWidget {
  const CustomBottomNav({super.key});

  @override
  State<CustomBottomNav> createState() => _CustomBottomNavState();
}

class _CustomBottomNavState extends State<CustomBottomNav> {
  int _selectedIndex = 0;

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
      child: Container(
        // Reduced height to prevent overflow
        height: 68,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(30),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.08),
              blurRadius: 15,
              spreadRadius: 1,
              offset: const Offset(0, 8),
            ),
            BoxShadow(
              color: Colors.black.withOpacity(0.03),
              blurRadius: 5,
              spreadRadius: 0,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(30),
          child: BottomNavigationBar(
            currentIndex: _selectedIndex,
            onTap: _onItemTapped,
            type: BottomNavigationBarType.fixed,
            backgroundColor: Colors.transparent,
            elevation: 0,
            selectedItemColor: const Color(0xFF007AFF),
            unselectedItemColor: Colors.black45,
            // Reduced font size to save space
            selectedFontSize: 11,
            unselectedFontSize: 11,
            items: List.generate(5, (index) {
              IconData icon;
              String label;

              switch (index) {
                case 0:
                  icon = FontAwesomeIcons.house;
                  label = 'Home';
                  break;
                case 1:
                  icon = FontAwesomeIcons.heart;
                  label = 'Favorites';
                  break;
                case 2:
                  icon = FontAwesomeIcons.bagShopping;
                  label = 'Shop';
                  break;
                case 3:
                  icon = FontAwesomeIcons.bell;
                  label = 'Notifications';
                  break;
                case 4:
                  icon = FontAwesomeIcons.user;
                  label = 'Profile';
                  break;
                default:
                  icon = FontAwesomeIcons.house;
                  label = 'Home';
              }

              return BottomNavigationBarItem(
                icon: Container(
                  // Reduced margin to prevent overflow
                  // margin: const EdgeInsets.only(bottom: 12, top: 10),
                  child: Stack(
                    alignment: Alignment.center,
                    children: [
                      // Touch effect circle with slightly smaller dimensions
                      if (_selectedIndex == index)
                        Container(
                          width: 40,
                          height: 40,
                          decoration: BoxDecoration(
                            color: Colors.grey.withOpacity(0.15),
                            shape: BoxShape.circle,
                          ),
                        ),
                      FaIcon(
                        icon,
                        // Slightly smaller icon size
                        size: 18,
                        color: _selectedIndex == index
                            ? const Color(0xFF007AFF)
                            : Colors.black45,
                      ),
                    ],
                  ),
                ),
                label: label,
              );
            }),
          ),
        ),
      ),
    );
  }
}
